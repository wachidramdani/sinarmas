import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import Swal from 'sweetalert2';

import API from '../../API';

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      nav: {
        items: []
      }
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  loadData() {
    const parent = [];
    const child = [];
    // if (localStorage.getItem('token') !== null){
    //   API.get('api/auth/menu/')
    //   .then(res => {
    //     if(res.status === 200){ 
    //       res.data.data.forEach(function(items) {
    //         (items.parent_id === '0') ? parent.push(items) : child.push(items);  
    //       })
    //       for(let i=0; i<parent.length; i++) {
    //         parent[i].title = (parent[i].title === '1') ? true : false;
    //         for(let j=0; j<child.length; j++) {
    //           child[j].title = (child[j].title === '1') ? true : false;
    //           if(String(child[j].parent_id) === String(parent[i].id)) {
    //             (parent[i]['children'] === undefined) ? parent[i]['children'] = [child[j]] : parent[i]['children'].push(child[j]);
    //           }
    //         }
    //       }
    //     }
    //     this.setState(prevState => {
    //       let nav = Object.assign({}, prevState.nav);
    //       nav.items = parent;             
    //       return { nav };
    //     });
    //   }).catch((error) => {
    //     Swal.fire({  
    //         title: 'Error',  
    //         icon: 'error',  
    //         text: 'Please Check Your Network Connection.',  
    //     });
    //   });
    // }
  }

  componentDidMount() {
    this.loadData();
  }

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg" minimized>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <div className="button-breadcrumb">
              <i className="icon-pushpin" style={{fontSize: '15px'}}></i>
              <i className="icon-reset" style={{fontSize: '15px', backgroundColor: 'yellow', borderRadius: '10px', padding: '1px 2px 3px 2px ', color: '#333'}}></i>
              <i className="icon-comments"></i>
              <i className="icon-bookmark3" style={{fontWeight: 'bold'}}></i>
              <i className="icon-share3" style={{fontSize: '15px'}}></i>
              <i className="icon-star-empty3" style={{fontWeight: 'bold'}}></i>
              <i className="icon-envelope" style={{fontSize: '18px'}}></i>
              <i className="icon-upload7" style={{fontSize: '18px'}}></i>
              <i className="icon-menu" style={{marginLeft: '10px'}}></i>
            </div>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/planning/unit" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside> */}
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
