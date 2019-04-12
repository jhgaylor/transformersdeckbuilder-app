import React, { Component } from 'react';
import { Mutation } from "react-apollo";

import { TTCGMutations, TTCGUpdaters } from '../../../api/graphql.js';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Input } from 'reactstrap';

export default class NewDeckWindow extends Component {

  constructor(props, context) {
    super(props, context);

    this.makeHandleCreateDeck = this.makeHandleCreateDeck.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePublicChange = this.handlePublicChange.bind(this);

    this.state = this.getDefaultState()
  }

  getDefaultState() {
    return {
      show: false,
      name: "",
      isPublic: true,
    };
  }

  makeHandleCreateDeck(mutate) {
    return () => {
      console.log("state", this.state);
      let name = this.state.name;
      let is_public = this.state.isPublic;
      const addDeckInput = {
        name, 
        is_public,
      }
      mutate({ variables: addDeckInput })
      this.setState(this.getDefaultState())
    }
  }

  handleToggle() {
    this.setState({ show: !this.state.show });
  }

  handleShow() {
    console.log("handle show");
    this.setState({ show: true });
  }

  handleNameChange(e){
    this.setState({name: e.target.value})
  }

  handlePublicChange(e){
    console.log("public", e.target.checked)
    this.setState({isPublic: e.target.checked})
  }

  // TODO: error on names that are taken
  getNameValidationState() {
    const length = this.state.name.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  render() {
    return (
      <Mutation mutation={TTCGMutations.ADD_DECK} update={TTCGUpdaters.updateCacheWithAddedDeck}>
        {
          (mutate) => {
            return (
              <div>
                <Button color="primary" size="large" onClick={this.handleShow}>
                  Create New Deck
                </Button>

                <Modal isOpen={this.state.show} toggle={this.handleToggle}>
                  <ModalHeader toggle={this.handleToggle}>
                    Create New Deck
                  </ModalHeader>
                  <ModalBody>
                    <form>
                      <FormGroup>
                        <Label>Deck Name</Label>
                        <Input 
                          type="text"
                          value={this.state.name}
                          placeholder="Deck Name"
                          onChange={this.handleNameChange}
                          />
                      </FormGroup>
                      <FormGroup className="form-check">
                        <Input
                          id="deckPublic"
                          type="checkbox"
                          checked={this.state.isPublic}
                          onChange={this.handlePublicChange}
                          />
                        <Label className="form-check-label" for="deckPublic">Make Discoverable</Label>
                      </FormGroup>
                    </form>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={this.makeHandleCreateDeck(mutate)}>Save</Button>
                  </ModalFooter>
                </Modal>
              </div>
            )
          }
        }
      </Mutation>
    );
  }
}