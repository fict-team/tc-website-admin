import Input from "../Input";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Request, setAuthorization, getLocalTokens } from "../../core/api";
import IState from "../../core/store";
import { IUser } from "../../core/authorization";

export default (Component) => {
  const withLogin = (props) => {
    const dispatch = useDispatch();
    const user = useSelector<IState>(state => state.user) as IUser;
    const isMounted = useRef(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      if (!user) {
        const { accessToken, refreshToken } = getLocalTokens();
        if (accessToken && refreshToken) {
          dispatch({
            type: 'authorize',
            accessToken,
            refreshToken,
          });
        }
      }
    }, [user]);

    if (user) {
      return <Component {...props} />;
    }

    return (
      <div className="container">
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="column is-4 is-offset-4">
                        <h3 className="title has-text-black">Login</h3>
                        <hr style={{ backgroundColor: '#000000', opacity: 0.15 }} />
                        <p className="subtitle has-text-black">Sign in to your account</p>
                        <div className="box">
                          <Input 
                            type="text" 
                            placeholder="Username" 
                            icon="fa-user" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <Input 
                            type="password" 
                            placeholder="Password" 
                            icon="fa-lock" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button 
                            className="button is-block is-info is-fullwidth"
                            onClick={async () => {
                              const { data } = await Request.create('POST')
                                .data({ username, password })
                                .exec('/token');

                              const { access_token: accessToken, refresh_token: refreshToken } = data;
                              setAuthorization(accessToken, refreshToken);

                              if (isMounted) {
                                dispatch({
                                  type: 'authorize',
                                  accessToken,
                                  refreshToken,
                                });
                              }
                            }}
                          >
                            Login
                          </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
    );
  };

  if (Component.getInitialProps) {
    withLogin.getInitialProps = Component.getInitialProps;
  }

  return withLogin;
}

