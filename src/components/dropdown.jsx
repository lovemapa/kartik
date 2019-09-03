import React from 'react';
/* import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'; */
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  

  render() {
    return (
      <UncontrolledDropdown>
      <DropdownToggle caret>
        Dropdown
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem value="photographer" header>Header</DropdownItem>
        <DropdownItem  value="music" disabled>Action</DropdownItem>
        <DropdownItem value ="hjf">Another Action</DropdownItem>
        <DropdownItem  divider />
        <DropdownItem value="kari">Another Action</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
    );
  }
}