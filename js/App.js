import { getTeamDetail, addMember } from './api/index.js';
import TodoApp from './components/TodoApp.js';
import { todoListTemplate, addMemberTemplate } from './template.js';

function App() {
  this.teamId = '';
  this.teamName = '';
  this.members = '';
  this.membersById = {};
  this.membersTodos = {};

  const $teamTitle = document.querySelector('#team-title');
  const $todoApps = document.querySelector('.todoapp-list-container');

  this.inputMemberNameAndSend = async (event) => {
    if (!event.target.closest('#add-user-button')) return;
    const memberName = prompt('새로운 팀원 이름을 입력해주세요');
    if (!memberName) return;
    const res = await this.addMember(memberName);
    this.getTeamDetail(res._id);
  };

  this.addMember = async (memberName) => {
    const { result, error, errorMessage } = await addMember(this.teamId, memberName);
    if (error) return alert(errorMessage);
    return result;
  };

  this.getTeamDetail = async (id) => {
    const { result, error, errorMessage } = await getTeamDetail(id);
    if (error) return alert(errorMessage);
    this.setState(result);
    return result;
  };

  $todoApps.addEventListener('click', this.inputMemberNameAndSend);

  this.setState = (data) => {
    this.teamId = data._id;
    this.teamName = data.name;
    this.members = data.members;
    this.render();
  };

  this.render = () => {
    $teamTitle.querySelector('strong').innerHTML = this.teamName;
    $todoApps.innerHTML = this.members.map((item) => todoListTemplate(item)).join('') + addMemberTemplate();
  };

  this.init = async () => {
    const params = (new URL(document.location)).searchParams;
    const teamId = params.get('id');
    await this.getTeamDetail(teamId);
    this.membersTodos = this.members.map((member) => new TodoApp(this.teamId, member));
  };
}

const app = new App();
app.init();
