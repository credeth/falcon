class AgentUtils {
  static isNameEmailPresent() {
    return (
      !!localStorage.PropelldAgentName || !!localStorage.PropelldAgentMobile
    );
  }
  static getName() {
    return localStorage.PropelldAgentName;
  }
  static getMobile() {
    return localStorage.PropelldAgentMobile;
  }
  static setNameMobile(name, mobile) {
    localStorage.setItem("PropelldAgentName", name);
    localStorage.setItem("PropelldAgentMobile", mobile);
  }
}

export default AgentUtils;
