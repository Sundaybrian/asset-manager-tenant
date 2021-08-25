import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Content from '../../components/Container/Content';
import { dispatchStore } from '../../redux/store';
import { logoutUser } from '../../redux/Actions/authActions';

/* eslint-disable no-useless-constructor */

interface Props {
  history: any;
  location;
  match;
  matchPath: string;
  routes: any[];
  authenticated?: boolean | string;
  user: any;
}

export class Main extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  goHome = () => {
    this.props.history.push(`${this.props.matchPath}/${this.props.routes[1].path}`);
  };

  componentDidMount() {
    this.goHome();
  }

  render() {
    const { matchPath, authenticated } = this.props;
    return (
      <Content>
        <Route
          path={`${matchPath}/:id`}
          render={(props) => {
            // not authenticated,we kick user out
            if (!authenticated) {
              dispatchStore(logoutUser());
              return;
            }

            const GOTOPAGE = this.props.routes.find((p) => {
              return p.text === props.match.params.id;
            });

            return (
              <GOTOPAGE.component
                routes={
                  // sending routes thru, will be useful for containers
                  GOTOPAGE.routes !== null ? GOTOPAGE.routes : []
                }
                {...props}
              />
            );
          }}
        />
      </Content>
    );
  }
}

export default withRouter(Main);
