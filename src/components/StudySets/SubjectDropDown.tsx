import { Dropdown, DropdownButton } from "react-bootstrap";
import {useState} from "react";
import {Subject} from "../../Models/Subject";

const SubjectDropDown = (props: any) => {
    const [topic, setTopic] = useState('OOP');
    let topics = new Map ([
        ['OOP', 1],
        ['Core Java',2],
        ['JUnit',3],
        ['SQL',4],
        ['Java Servlets',5],
        ['Docker',6],
        ['React',7],
        ['Hibernate',8],
        ['Spring',9],
        ['SOAP',10],
        ['REST',11],
        ['Javascript',12],
    ])
    const changeHandler = (e: any) => {
        let subject = {id: topics.get(e), name: e};
            props.onChangeCallback(subject);
            setTopic(e);

    }
    return <div>
        <DropdownButton id="dropdown-basic-button" title={topic} onSelect={changeHandler}>
            <Dropdown.Item eventKey="OOP">OOP</Dropdown.Item>
            <Dropdown.Item eventKey="Core Java">Core Java</Dropdown.Item>
            <Dropdown.Item eventKey="JUnit">JUnit</Dropdown.Item>
            <Dropdown.Item eventKey="SQL">SQL</Dropdown.Item>
            <Dropdown.Item eventKey="Java Servlets">Java Servlets</Dropdown.Item>
            <Dropdown.Item eventKey="Docker">Docker</Dropdown.Item>
            <Dropdown.Item eventKey="React">React</Dropdown.Item>
            <Dropdown.Item eventKey="Hibernate">Hibernate</Dropdown.Item>
            <Dropdown.Item eventKey="Spring">Spring</Dropdown.Item>
            <Dropdown.Item eventKey="SOAP">SOAP</Dropdown.Item>
            <Dropdown.Item eventKey="REST">REST</Dropdown.Item>
            <Dropdown.Item eventKey="Javascript">Javascript</Dropdown.Item>
        </DropdownButton>
    </div>
};

export default SubjectDropDown;