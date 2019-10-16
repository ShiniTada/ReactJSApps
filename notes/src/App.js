import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from './form/form';
import FactList from './factlist/factList';
import Service from './service/service';

class Fact {
    constructor(id = undefined, text = undefined, color = undefined) {
        this.id = id;
        this.text = text;
        this.color = color;
    }

}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facts: [],
            id: 1,
            search: false,
            needFacts: [],
        };
        this.getFact = this.getFact.bind(this);
        this.deleteFacts = this.deleteFacts.bind(this);
        this.deleteFact = this.deleteFact.bind(this);
        this.searchFacts = this.searchFacts.bind(this);
        this.editFact = this.editFact.bind(this);
    }


    componentWillMount() {
        this.setState({
            facts: JSON.parse(Service.get())
        });
        if (Service.checkIsStart()) {
            this.getFact();
            this.getFact();
            this.getFact();
            Service.save(this.state.facts);
            Service.setId(this.state.id);
        }
        this.setState({
            id: Service.getId()
        });
    }


    render() {
        return (
            <div className="wrapper">
                <div className="container text-center">
                    <Form getFact={this.getFact}
                          deleteFacts={this.deleteFacts}
                          searchFacts={this.searchFacts}
                          text={this.state.text}/>

                    <FactList facts={this.state.facts}
                              search={this.state.search}
                              needFacts={this.state.needFacts}
                              deleteFact={this.deleteFact}
                              editFact={this.editFact}
                    />
                </div>
            </div>
        );
    }


    componentDidUpdate() {
        Service.save(this.state.facts);
        Service.setId(this.state.id);
    }

    getFact() {
        const randomFact = 'https://api.chucknorris.io/jokes/random';
        axios.get(randomFact)
            .then(response => {
                const text = response.data.value;
                let newFact = new Fact(this.state.id, text, Service.getRandomColor());
                let nextId = Number(this.state.id) + Number(1);
                this.setState(state => ({
                    facts: state.facts.concat(newFact),
                    id: nextId
                }));
            }).catch(error => {
            console.log(error);
        });
    }

    deleteFacts() {
        this.setState({
            facts: [],
            id: 1
        })
    }

    deleteFact(fact) {
        let index = this.state.facts.indexOf(fact);
        if (index !== -1) {
            let updatedFacts = this.state.facts;
            updatedFacts.splice(index, 1);
            this.setState({facts: updatedFacts});
        }
    }

    editFact(fact) {
        let editedText = prompt("edit joke", fact.text);
        if (editedText !== null) {
            let index = this.state.facts.indexOf(fact);
            if (index !== -1) {
                let updatedFacts = this.state.facts;
                updatedFacts[index].text = editedText;
                this.setState({facts: updatedFacts});
            }
        }
    }

    searchFacts(e) {
        if (e.target.value === "") {
            this.setState({search: false, needFacts: []});
        } else {
            let need = [];
            for (let fact of this.state.facts) {
                let found = fact.text.indexOf(e.target.value);
                if (found !== -1) {
                    need.push(fact);
                }
            }
            this.setState({search: true, needFacts: need});
        }
    }


}

export default App;
