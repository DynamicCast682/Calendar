import React, { Component } from 'react'
import './scss/Auth.scss'
import _ from 'lodash'




export class AuthAnimation {
  private component: React.Component
  constructor(component: React.Component) {
    this.component = component
    this.component.state
  }
  toggleAnimationStart = (bg_props_: AuthBGProps) => {
    let bg_props = _.cloneDeep(bg_props_);
    bg_props.display = 'block';
    bg_props.opacity = 1;
    this.component.setState({
      bg_props: bg_props
    })
  }
}



type Props = {
  AuthFieldShow: boolean,
  // callback: Function,
}

type State = {
  // AuthFieldShow: boolean
}

export default class Auth extends Component<Props, State> {
  private animation: AuthAnimation
  constructor(props: Props) {
    super(props)
    this.state
    this.animation = new AuthAnimation(this);
  }
  
  render() {
    return (
      <div
        className={`AuthDarkBG ${this.props.AuthFieldShow ? 'AuthDarkBGEnable' : ''}`}
        style={{ display: this.props.AuthFieldShow ? '' : 'none' }}
      >
        <div className="MainAuth">
          <h2>Log in</h2>
          <button className="Google Auth">
            <div className="logo">
              <img src="/static/logos/google.svg" />
            </div>
            <div className="context">
              Sing in with Google
            </div>
          </button>
          <button className="Telegram Auth">
            <div className="logo">
              <img src="/static/logos/telegram.svg" />
            </div>
            <div className="context">
              Sing in with Telegram
            </div>
          </button>
          <input type="text" name="AuthLogin" id="AuthLogin" className="AuthField"/>
          <input type="text" name="AuthPass" id="AuthPass" className="AuthField" />
        </div>
      </div>
    )
  }
}