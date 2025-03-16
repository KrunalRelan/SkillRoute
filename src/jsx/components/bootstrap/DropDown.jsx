import React, { Fragment, useState } from "react";
import Highlight from "react-highlight";
import {Link} from 'react-scroll';

import {
  Row,
  Col,
  Card,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  SplitButton,
  Tab, Nav
} from "react-bootstrap";

const sidebarLink = [
  {to:'basic-dropdown', title:'Basic Dropdown'},
  {to:'dropdown-divider', title:'Dropdown Divider'},
  {to:'dropdown-header', title:'Dropdown Header'},
  {to:'disable-active', title:'Dropdown Disable'},
  {to:'align-right', title:'Align Right'},
  {to:'dropup', title:'Dropup'},
  {to:'dropright', title:'Dropright'},
  {to:'dropstart', title:'Dropstart'},
  {to:'button-dropdowns', title:'Button Dropdowns'},
  {to:'sizing', title:'Sizing'},
  {to:'custom-style', title:'Custom Style'},
];

const UiDropDown = () => {
  const [activeLink ,setActiveLink] = useState(0);
  return (
    <Fragment>      
      <div className="row ">
				<div className="col-xl-12">
					<div className="page-titles">
						<div className="d-flex align-items-center">
							<h2 className="heading">DropDown</h2>
						</div>
					</div>
				</div>
			</div>
      <div className="element-area">
        <div className="demo-view">
          <div className="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
            <Row>
              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="basic-dropdown" className="dz-card">
                    <Card.Header className="flex-wrap">
                      <div>
                        <Card.Title>Basic Dropdown</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          A dropdown menu is a toggleable menu that allows the user to
                          choose one value from a predefined list
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            <Dropdown>
                              <Dropdown.Toggle variant="primary" >
                                Dropdown button
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<div className="basic-dropdown">
  <Dropdown>
    <Dropdown.Toggle variant="primary">
      Dropdown button
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>  
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="dropdown-divider" className="dz-card">
                    <Card.Header className="flex-wrap">
                      <div>
                        <Card.Title>Dropdown Divider</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          The <code>.dropdown-divider</code> class is used to separate
                          links inside the dropdown menu with a thin horizontal border
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            <Dropdown>
                              <Dropdown.Toggle variant="primary" >
                                Dropdown button
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                                <div className="dropdown-divider"></div>
                                <Dropdown.Item >Another link</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<div className="basic-dropdown">
  <Dropdown>
    <Dropdown.Toggle variant="primary">
      Dropdown button
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
      <div className="dropdown-divider"></div>
      <Dropdown.Item >Another link</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="dropdown-header" className="dz-card">
                    <Card.Header className="flex-wrap">
                      <div>

                        <Card.Title>Dropdown Header</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          The <code>.dropdown-header</code> class is used to add headers
                          inside the dropdown menu
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            <Dropdown>
                              <Dropdown.Toggle variant="primary" >
                                Dropdown button
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <h5 className="dropdown-header">Dropdown header</h5>
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                                <h5 className="dropdown-header">Dropdown header</h5>
                                <Dropdown.Item >Another link</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<div className="basic-dropdown">
  <Dropdown>
    <Dropdown.Toggle variant="primary">
      Dropdown button
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <h5 className="dropdown-header">Dropdown header</h5>
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
      <h5 className="dropdown-header">Dropdown header</h5>
      <Dropdown.Item >Another link</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                     </Tab.Content>
                        
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="disable-active" className="dz-card">
                    <Card.Header className="flex-wrap">
                      <div>
                        <Card.Title>Disable and Active items</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          The <code>.dropdown-header</code> class is used to add headers
                          inside the dropdown menu
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            <Dropdown>
                              <Dropdown.Toggle variant="primary" >
                                Dropdown button
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item >Normal</Dropdown.Item>
                                <Link to={"#"} className="dropdown-item active">
                                  Active
                                </Link>
                                <Link to={"#"} className="dropdown-item disabled">
                                  Disabled
                                </Link>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<div className="basic-dropdown">
  <Dropdown>
    <Dropdown.Toggle variant="primary">
      Dropdown button
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item >Normal</Dropdown.Item>
      <Link to={"#"} className="dropdown-item active">
        Active
      </Link>
      <Link to={"#"} className="dropdown-item disabled">
        Disabled
      </Link>
    </Dropdown.Menu>
  </Dropdown>
</div>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="align-right" className="dz-card">
                    <Card.Header className="flex-wrap">
                      <div>

                        <Card.Title>Align Right</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          To right-align the dropdown, add the{" "}
                          <code>.dropdown-menu-end</code> class to the element with
                          .dropdown-menu
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                        <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            <Dropdown>
                              <Dropdown.Toggle variant="primary" >
                                Dropdown button
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu-right">
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
 <div className="basic-dropdown">
  <Dropdown>
    <Dropdown.Toggle variant="primary">
      Dropdown button
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-menu-right">
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12} >
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="dropup" className="dz-card">
                    <Card.Header className="flex-wrap">
                      <div>
                        <Card.Title>Dropup</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          The <code>.dropup</code> class makes the dropdown menu expand
                          upwards instead of downwards
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            {/* <!-- Default dropup button --> */}
                            <DropdownButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-up"
                              drop="up"
                              variant="primary"
                              title="Dropup"
                              className="me-1 mt-1"
                            >
                              <Dropdown.Item >Link 1</Dropdown.Item>
                              <Dropdown.Item >Link 2</Dropdown.Item>
                              <Dropdown.Item >Link 3</Dropdown.Item>
                            </DropdownButton>

                            {/* <!-- Split dropup button --> */}
                            <SplitButton
                              as={ButtonGroup}
                              variant="primary"
                              id="dropdown-button-drop-up"
                              className="mt-1"
                              drop="up"
                              title="Split dropup"
                            >
                              <Dropdown.Item >Link 1</Dropdown.Item>
                              <Dropdown.Item >Link 2</Dropdown.Item>
                              <Dropdown.Item >Link 3</Dropdown.Item>
                            </SplitButton>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<div className="basic-dropdown">  
  <DropdownButton
    as={ButtonGroup}
    id="dropdown-button-drop-up"
    drop="up"
    variant="primary"
    title="Dropup"
    className="me-1 mt-1"
  >
    <Dropdown.Item >Link 1</Dropdown.Item>
    <Dropdown.Item >Link 2</Dropdown.Item>
    <Dropdown.Item >Link 3</Dropdown.Item>
  </DropdownButton>
  <SplitButton
    as={ButtonGroup}
    variant="primary"
    id="dropdown-button-drop-up"
    className="mt-1"
    drop="up"
    title="Split dropup"
  >
    <Dropdown.Item >Link 1</Dropdown.Item>
    <Dropdown.Item >Link 2</Dropdown.Item>
    <Dropdown.Item >Link 3</Dropdown.Item>
  </SplitButton>
</div>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12} >
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="dropright" className="dz-card">
                    <Card.Header className="flex-wrap">
                      <div>
                        <Card.Title>Dropright </Card.Title>
                        <Card.Text className="m-0 subtitle">
                          Trigger dropdown menus at the right of the elements by adding{" "}
                          <code>.dropend</code> to the parent element
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            {/* <!-- Default dropright button --> */}
                            <div className="btn-group dropend ">
                              <DropdownButton
                                as={ButtonGroup}
                                id="dropdown-button-drop-end"
                                drop="end"
                                variant="primary"
                                title=" Dropright"
                                className="me-1 mb-1"
                              >
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </DropdownButton>
                            </div>

                            {/* <!-- Split dropright button --> */}
                            <div className="btn-group dropend ">
                              <SplitButton
                                as={ButtonGroup}
                                variant="primary"
                                id="dropdown-button-drop-end"
                                className="mb-1 me-1"
                                drop="end"
                                title="Split dropright"
                              >
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </SplitButton>
                            </div>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<div className="basic-dropdown"> 
  <div className="btn-group dropright ">
    <DropdownButton
      as={ButtonGroup}
      id="dropdown-button-drop-right"
      drop="right"
      variant="primary"
      title=" Dropright"
      className="me-1 mb-1"
    >
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </DropdownButton>
  </div>  
  <div className="btn-group dropright ">
    <SplitButton
      as={ButtonGroup}
      variant="primary"
      id="dropdown-button-drop-right"
      className="mb-1 me-1"
      drop="right"
      title="Split dropright"
    >
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </SplitButton>
  </div>
</div>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="dropstart" className="dz-card">
                    <Card.Header className="flex-wrap">
                      <div>

                        <Card.Title>Dropstart </Card.Title>
                        <Card.Text className="m-0 subtitle">
                          Trigger dropdown menus at the right of the elements by adding{" "}
                          <code>.dropstart </code> to the parent element
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">                        
                            <DropdownButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-start"
                              drop="start"
                              variant="primary"
                              className="dropstart me-1 mt-1"
                              title="dropstart"
                            >
                              <Dropdown.Item >Link 1</Dropdown.Item>
                              <Dropdown.Item >Link 2</Dropdown.Item>
                              <Dropdown.Item >Link 3</Dropdown.Item>
                            </DropdownButton>

                            {/* <!-- Split dropleft button --> */}
                            <div className="btn-group ">
                              <SplitButton
                                as={ButtonGroup}
                                variant="primary"
                                id="dropdown-button-drop-start"
                                className="dropstart mt-1"
                                drop="start"
                                title="Split dropstart"
                              >
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </SplitButton>
                            </div>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
  <pre className="mb-0"><code className="language-html">
  <Highlight>
  {`
<div className="basic-dropdown">                        
  <DropdownButton
    as={ButtonGroup}
    id="dropdown-button-drop-start"
    drop="start"
    variant="primary"
    className="dropstart me-1 mt-1"
    title="dropstart"
  >
    <Dropdown.Item >Link 1</Dropdown.Item>
    <Dropdown.Item >Link 2</Dropdown.Item>
    <Dropdown.Item >Link 3</Dropdown.Item>
  </DropdownButton>

  {/* <!-- Split dropleft button --> */}
  <div className="btn-group ">
    <SplitButton
      as={ButtonGroup}
      variant="primary"
      id="dropdown-button-drop-start"
      className="dropstart mt-1"
      drop="start"
      title="Split dropstart"
    >
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </SplitButton>
  </div>
</div>
  `}
  </Highlight>
  </code></pre>
  </div>
                      </Tab.Pane>
                    </Tab.Content>

                  </Card>
                </Tab.Container>  
              </Col>
            

            
              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="button-dropdowns" className="dz-card">
                    <Card.Header className="flex-wrap">
                      <div>
                        <Card.Title>Button Dropdowns</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="button-dropdown">
                            {[
                              "Primary",
                              "Secondary",
                              "Success",
                              "Info",
                              "Warning",
                              "Danger",
                            ].map((variant) => (
                              <SplitButton
                                key={variant}
                                as={ButtonGroup}
                                variant={variant.toLowerCase()}
                                id="dropdown-button-drop-dwon"
                                className="mt-1 me-1"
                                drop="down"
                                title={` ${variant}`}
                              >
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </SplitButton>
                            ))}
                          </div>
                        </Card.Body>
                      </Tab.Pane>  
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<div className="button-dropdown">
  {[
    "Primary",
    "Secondary",
    "Success",
    "Info",
    "Warning",
    "Danger",
  ].map((variant) => (
    <SplitButton
      key={variant}
      as={ButtonGroup}
      variant={variant.toLowerCase()}
      id="dropdown-button-drop-dwon"
      className="mt-1 me-1"
      drop="down"
      title={\` $\{variant}\`}
    >
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </SplitButton>
  ))}
</div>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>  
                    </Tab.Content>

                  </Card>
                </Tab.Container>  
              </Col>
            

            
              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">            
                  <Card name="sizing" className="dz-card">
                    <Card.Header className="flex-wrap">
                      <div>
                        <Card.Title>Sizing</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          Button dropdowns work with buttons of all sizes, including
                          default and split dropdown buttons.
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="dropdown-size">
                            {/* <!-- Large button groups (default and split) --> */}
                            <DropdownButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-down"
                              drop="down"
                              variant="primary"
                              size="lg"
                              title=" Large button"
                              className="me-1 mb-1"
                            >
                              <Dropdown.Item >Action</Dropdown.Item>
                              <Dropdown.Item >Another action</Dropdown.Item>
                              <Dropdown.Item >Something else here</Dropdown.Item>
                              <div className="dropdown-divider"></div>
                              <Dropdown.Item >Separated link</Dropdown.Item>
                            </DropdownButton>

                            <SplitButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-down"
                              drop="down"
                              variant="primary"
                              size="lg"
                              title=" Large split button"
                              className="me-1"
                            >
                              <Dropdown.Item >Action</Dropdown.Item>
                              <Dropdown.Item >Another action</Dropdown.Item>
                              <Dropdown.Item >Something else here</Dropdown.Item>
                              <div className="dropdown-divider"></div>
                              <Dropdown.Item >Separated link</Dropdown.Item>
                            </SplitButton>

                            {/* <!-- Small button groups (default and split) --> */}

                            <DropdownButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-down"
                              drop="down"
                              variant="primary"
                              size="sm"
                              className="mt-1 me-1"
                              title=" Large button"
                            >
                              <Dropdown.Item >Action</Dropdown.Item>
                              <Dropdown.Item >Another action</Dropdown.Item>
                              <Dropdown.Item >Something else here</Dropdown.Item>
                              <div className="dropdown-divider"></div>
                              <Dropdown.Item >Separated link</Dropdown.Item>
                            </DropdownButton>

                            <SplitButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-down"
                              drop="down"
                              variant="primary"
                              size="sm"
                              title=" Large split button"
                              className="mt-1 me-1"
                            >
                              <Dropdown.Item >Action</Dropdown.Item>
                              <Dropdown.Item >Another action</Dropdown.Item>
                              <Dropdown.Item >Something else here</Dropdown.Item>
                              <div className="dropdown-divider"></div>
                              <Dropdown.Item >Separated link</Dropdown.Item>
                            </SplitButton>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<div className="dropdown-size">
  <DropdownButton
    as={ButtonGroup}
    id="dropdown-button-drop-down"
    drop="down"
    variant="primary"
    size="lg"
    title=" Large button"
    className="me-1 mb-1"
  >
    <Dropdown.Item >Action</Dropdown.Item>
    <Dropdown.Item >Another action</Dropdown.Item>
    <Dropdown.Item >Something else here</Dropdown.Item>
    <div className="dropdown-divider"></div>
    <Dropdown.Item >Separated link</Dropdown.Item>
  </DropdownButton>

  <SplitButton
    as={ButtonGroup}
    id="dropdown-button-drop-down"
    drop="down"
    variant="primary"
    size="lg"
    title=" Large split button"
    className="me-1"
  >
    <Dropdown.Item >Action</Dropdown.Item>
    <Dropdown.Item >Another action</Dropdown.Item>
    <Dropdown.Item >Something else here</Dropdown.Item>
    <div className="dropdown-divider"></div>
    <Dropdown.Item >Separated link</Dropdown.Item>
  </SplitButton>

  <DropdownButton
    as={ButtonGroup}
    id="dropdown-button-drop-down"
    drop="down"
    variant="primary"
    size="sm"
    className="mt-1 me-1"
    title=" Large button"
  >
    <Dropdown.Item >Action</Dropdown.Item>
    <Dropdown.Item >Another action</Dropdown.Item>
    <Dropdown.Item >Something else here</Dropdown.Item>
    <div className="dropdown-divider"></div>
    <Dropdown.Item >Separated link</Dropdown.Item>
  </DropdownButton>

  <SplitButton
    as={ButtonGroup}
    id="dropdown-button-drop-down"
    drop="down"
    variant="primary"
    size="sm"
    title=" Large split button"
    className="mt-1 me-1"
  >
    <Dropdown.Item >Action</Dropdown.Item>
    <Dropdown.Item >Another action</Dropdown.Item>
    <Dropdown.Item >Something else here</Dropdown.Item>
    <div className="dropdown-divider"></div>
    <Dropdown.Item >Separated link</Dropdown.Item>
  </SplitButton>
</div>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>

                  </Card>
                </Tab.Container>  
              </Col>
            

            
              <Col lg={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card id="custom-style" className="dz-card">
                    <Card.Header className="flex-wrap">
                      <div>
                        <Card.Title>Custom style</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          Use <code>.custom-dropdown</code> this class for this style
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                        <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <Row>
                            <Col xl={3}>
                              <Dropdown>
                                <Dropdown.Toggle variant="" className="ps-0 mt-1 mb-2">
                                  Last 7 days
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Last 1 Month</Dropdown.Item>
                                  <Dropdown.Item >Last 6 Month</Dropdown.Item>
                                  <Dropdown.Item >Last 10 Month</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3}>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="outline-primary"
                                  size="sm"
                                  className="mt-1 mb-2"
                                >
                                  Last 7 days
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Last 1 Month</Dropdown.Item>
                                  <Dropdown.Item >Last 6 Month</Dropdown.Item>
                                  <Dropdown.Item >Last 10 Month</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3}>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="outline-primary"
                                  size="sm"
                                  className="mt-1 mb-2"
                                >
                                  Last 1 Hour
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Last 1 hour</Dropdown.Item>
                                  <Dropdown.Item >Last 2 hour</Dropdown.Item>
                                  <Dropdown.Item >Last 3 hour</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3}>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="primary"
                                  size="sm"
                                  className="mt-1 mb-2"
                                >
                                  Last 1 Hour
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Last 1 hour</Dropdown.Item>
                                  <Dropdown.Item >Last 2 hour</Dropdown.Item>
                                  <Dropdown.Item >Last 3 hour</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3}>
                              <Dropdown className="custom-dropdown">
                                <Dropdown.Toggle
                                  variant="primary"
                                  className="btn btn-sm i-false d-flex align-items-center"
                                  data-toggle="dropdown"
                                >
                                  <i className="ti-search me-2 mt-1"></i> 3 AM
																	<i className="fa fa-angle-down ms-3"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >6 AM</Dropdown.Item>
                                  <Dropdown.Item >9 AM</Dropdown.Item>
                                  <Dropdown.Item >12 AM</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3}>
                              <Dropdown className="custom-dropdown">
                                <Dropdown.Toggle
                                  variant="primary"
                                  size="sm"
                                  id="whiteSpace"
                                  className="btn btn-sm btn-primary text-nowrap i-false"
                                >
                                  <i className="ti-calendar me-3"></i> March 20, 2018 &nbsp; To &nbsp;April
																	20, 2018
																	<i className="fa fa-angle-down ms-3"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >
                                    May 20, 2018 &nbsp; To &nbsp; June 20, 2018
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    July 20, 2018 &nbsp; To &nbsp; August 20, 2018
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>
                            <Col xl={3}>
                              <Dropdown className="custom-dropdown">
                                <Dropdown.Toggle
                                  as="button"
                                  variant=""
                                  className="btn sharp btn-primary tp-btn  ms-3 i-false"
                                  id="tp-btn"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="18px"
                                    height="18px"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                  >
                                    <g
                                      stroke="none"
                                      strokeWidth="1"
                                      fill="none"
                                      fillRule="evenodd"
                                    >
                                      <rect x="0" y="0" width="24" height="24" />
                                      <circle fill="#000000" cx="12" cy="5" r="2" />
                                      <circle fill="#000000" cx="12" cy="12" r="2" />
                                      <circle fill="#000000" cx="12" cy="19" r="2" />
                                    </g>
                                  </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Option 1</Dropdown.Item>
                                  <Dropdown.Item >Option 2</Dropdown.Item>
                                  <Dropdown.Item >Option 3</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3}>
                              <Dropdown className="custom-dropdown">
                                <Dropdown.Toggle
                                  as="button"
                                  variant=""
                                  className="btn sharp btn-primary tp-btn i-false"
                                  id="tp-btn"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="18px"
                                    height="18px"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                  >
                                    <g
                                      stroke="none"
                                      strokeWidth="1"
                                      fill="none"
                                      fillRule="evenodd"
                                    >
                                      <rect x="0" y="0" width="24" height="24" />
                                      <circle fill="#000000" cx="12" cy="5" r="2" />
                                      <circle fill="#000000" cx="12" cy="12" r="2" />
                                      <circle fill="#000000" cx="12" cy="19" r="2" />
                                    </g>
                                  </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Option 1</Dropdown.Item>
                                  <Dropdown.Item >Option 2</Dropdown.Item>
                                  <Dropdown.Item >Option 3</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<pre className="mb-0"><code className="language-html">
<Highlight>
{`
<Row>
  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle variant="" className="ps-0 mt-1 mb-2">
        Last 7 days
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Last 1 Month</Dropdown.Item>
        <Dropdown.Item >Last 6 Month</Dropdown.Item>
        <Dropdown.Item >Last 10 Month</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-primary"
        size="sm"
        className="mt-1 mb-2"
      >
        Last 7 days
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Last 1 Month</Dropdown.Item>
        <Dropdown.Item >Last 6 Month</Dropdown.Item>
        <Dropdown.Item >Last 10 Month</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-primary"
        size="sm"
        className="mt-1 mb-2"
      >
        Last 1 Hour
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Last 1 hour</Dropdown.Item>
        <Dropdown.Item >Last 2 hour</Dropdown.Item>
        <Dropdown.Item >Last 3 hour</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        variant="primary"
        size="sm"
        className="mt-1 mb-2"
      >
        Last 1 Hour
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Last 1 hour</Dropdown.Item>
        <Dropdown.Item >Last 2 hour</Dropdown.Item>
        <Dropdown.Item >Last 3 hour</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        variant="primary"
        className="btn btn-sm btn-primary mt-1 mb-2"
        data-toggle="dropdown"
      >
        <i className="ti-search m-r-5" /> 3 AM
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >6 AM</Dropdown.Item>
        <Dropdown.Item >9 AM</Dropdown.Item>
        <Dropdown.Item >12 AM</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        variant="primary"
        size="sm"
        id="whiteSpace"
        className="mt-1 mb-2"
      >
        <i className="ti-calendar m-r-5" /> March 20, 2018 &nbsp;
        To &nbsp;April 20, 2018
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >
          May 20, 2018 &nbsp; To &nbsp; June 20, 2018
        </Dropdown.Item>
        <Dropdown.Item >
          July 20, 2018 &nbsp; To &nbsp; August 20, 2018
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>
  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        as="button"
        variant=""
        className="btn sharp btn-primary tp-btn mt-1"
        id="tp-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <rect x="0" y="0" width="24" height="24" />
            <circle fill="#000000" cx="12" cy="5" r="2" />
            <circle fill="#000000" cx="12" cy="12" r="2" />
            <circle fill="#000000" cx="12" cy="19" r="2" />
          </g>
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Option 1</Dropdown.Item>
        <Dropdown.Item >Option 2</Dropdown.Item>
        <Dropdown.Item >Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        as="button"
        variant=""
        className="btn sharp btn-primary tp-btn mt-1"
        id="tp-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <rect x="0" y="0" width="24" height="24" />
            <circle fill="#000000" cx="12" cy="5" r="2" />
            <circle fill="#000000" cx="12" cy="12" r="2" />
            <circle fill="#000000" cx="12" cy="19" r="2" />
          </g>
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Option 1</Dropdown.Item>
        <Dropdown.Item >Option 2</Dropdown.Item>
        <Dropdown.Item >Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>
</Row>
`}
</Highlight>
</code></pre>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>
            </Row>            
          </div>
        </div>
        <div className="demo-right ">
          <div className="demo-right-inner dlab-scroll " id="right-sidebar">
              <h4 className="title">Examples For Dropdown</h4>
              <ul className="navbar-nav" id="menu-bar">
                  {sidebarLink.map((item, ind)=>(
                    <li key={ind}                        
                    >
                      <Link to={item.to} 
                        className={`scroll ${ind === activeLink ? 'active' :  ''} `}
                        activeClass="active"
                        spy={true}                          
                        smooth={true}
                        onClick={()=>setActiveLink(ind)}
                      > 
                        {item.title}
                      </Link>
                    </li>
                  ))} 
              </ul>	
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default UiDropDown;
