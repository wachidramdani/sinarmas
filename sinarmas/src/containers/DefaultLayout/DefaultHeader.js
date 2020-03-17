import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo_sinarmas.png'
import sygnet from '../../assets/img/brand/logo_sinarmas_small.png'
import Swal from 'sweetalert2';
import 'react-block-ui/style.css';

import API from '../../API';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    Swal.fire({
      title: 'Logout',
      text: "Are you sure to logout?",
      icon: 'warning',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        API.get('api/auth/logout/')
        .then(res => {
          if(res.status === 200){ 
            localStorage.clear();
            this.props.history.push('/login');
          }
        }).catch((error) => {
          if(error && error.response && error.response.status === 401){
              Swal.fire({  
                  title: 'Warning',  
                  icon: 'warning',  
                  text: 'Your ID Unauthorized.',  
              });
          }else{
              Swal.fire({  
                  title: 'Error',  
                  icon: 'error',  
                  text: 'Please Check Your Network Connection.',  
              });
          }
        });
      }
    });
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const dataUser = JSON.parse(localStorage.getItem('data'));
    const usavatar = (dataUser) ? dataUser.avatar : '';
    const usname = (dataUser) ? dataUser.name.split(' ')[0] : '';

    return (
        <React.Fragment>
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
          <AppNavbarBrand
            full={{ src: logo, width: 100, height: 30, alt: 'Logo' }}
            minimized={{ src: sygnet, width: 30, height: 30, alt: 'Logo' }}
          />
          <AppSidebarToggler className="d-md-down-none" display="lg" />

          <Nav className="d-md-down-none" navbar>
            <NavItem className="px-3">
              <NavLink to="#" className="nav-link" >File <i className="icon-arrow-down22"></i></NavLink>
            </NavItem>
            <NavItem className="px-3">
              <NavLink to="#" className="nav-link">View <i className="icon-arrow-down22"></i></NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem className="d-md-down-none item-top">
              <NavLink to="#" className="nav-link"><i className="icon-enlarge7"></i></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none item-top">
              <NavLink to="#" className="nav-link"><i className="icon-bubble7"></i></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none item-top">
              <NavLink to="#" className="nav-link"><i className="icon-cog3"></i></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none item-top">
              <NavLink to="#" className="nav-link"><i className="icon-arrow-down8"></i></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none item-top">
              <NavLink to="#" className="nav-link"><i className="icon-question7"></i></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none item-top" style={{borderRight: '1px solid #262626'}}>
              <NavLink to="#" className="nav-link"><i className="icon-accessibility"></i></NavLink>
            </NavItem>
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav>
                <img src={ '../../assets/img/avatars/4.jpg' } className="img-avatar" alt="avatar" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header tag="div" className="text-center"><strong><span className="name-bar">{ usname }</span></strong></DropdownItem>
                <DropdownItem><i className="icon-user-tie"></i> Profile</DropdownItem>
                <DropdownItem><i className="icon-cogs"></i> Settings</DropdownItem>
                <DropdownItem onClick={this.handleSubmit}><i className="icon-lock5"></i> Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/*<AppAsideToggler className="d-md-down-none" />
          <AppAsideToggler className="d-lg-none" mobile />*/}
        </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withRouter(DefaultHeader);
