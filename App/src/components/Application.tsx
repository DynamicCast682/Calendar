import React, { Component } from 'react'
import './scss/Application.scss'
import Header from './Header'
import Footer from './Footer'
import Auth, { AuthAnimation } from './Auth'

type Props = {}

type State = {
  AuthFieldShow: boolean
}

export default class Application extends Component<Props, State> {
  private auth_animation: AuthAnimation
  constructor(props: Props) {
    super(props)
    this.state = {
      AuthFieldShow: false
    }
    this.auth_animation = new AuthAnimation(this);
  }
  qkeyOpen = (event: KeyboardEvent) => {
    if (event.key === 'q') {
      this.setState({
        AuthFieldShow: !this.state.AuthFieldShow
      })
    }
  }
  componentDidMount(): void {
    document.addEventListener('keydown', this.qkeyOpen)
  }
  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.qkeyOpen)
  }
  render() {
    return (
      <>
        <Header />
        <Auth
          AuthFieldShow={this.state.AuthFieldShow}
          // callback={this.setState}
        />
        <Footer />
      </>
    )
  }
}