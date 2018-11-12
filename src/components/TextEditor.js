// react
import React, { Component, Fragment } from 'react';

// components
import { BoldMark } from './';
import { ItalicMark } from './';
import FormatToolbar from './FormatToolbar';

// vendors
import { Value } from 'slate';
import { Editor } from 'slate-react';
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
import { underline } from 'react-icons-kit/feather/underline';

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'This is a example text...',
                            }
                        ]
                    }
                ]
            }
        ]
    }
})

export default class TextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: initialValue
        }

        this.onChange = this.onChange.bind(this);
        this.renderMark = this.renderMark.bind(this);
    }

    onChange = ({ value }) => {
        this.setState({ value });
    }

    onKeyDown = (e, change) => {

        /* if the CTRL key is not pressed, then don't do anything */
        if (!e.ctrlKey) { return }
        
        /* apply change based on key */
        switch (e.key) {
            case 'b':{
                change.toggleMark('bold');
                return true;
            }

            case 'i':{
                change.toggleMark('italic');
                return true;
            }

            case 'u':{
                change.toggleMark('underline');
                return true;
            }

            case 'c':{
                change.toggleMark('code');
                return true;
            }

            case 'l':{
                change.toggleMark('list');
                return true;
            }

            break;
        }
    }

    renderMark = props => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />

            case 'italic':
                return <ItalicMark {...props} />

            case 'code':
                return <code {...props.attributes}>{props.children} </code>

            case 'list':
                return (
                    <ul {...props.attributes}>
                        <li>{props.children}</li>
                    </ul>
                )

            case 'underline':
                return <u {...props.attributes}>{props.children}</u>
        }
    }

    onMarkClick = (e, type) => {
        e.preventDefault();

        const { value } = this.state;
        const change = value.change().toggleMark(type);

        this.onChange(change);
    }

    render() {
        return (
            <Fragment>
                <FormatToolbar>
                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'bold')}
                        className="tooltip-icon-button">
                        <Icon icon={bold} />
                    </button>
                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'italic')}
                        className="tooltip-icon-button">
                        <Icon icon={italic} />
                    </button>
                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'code')}
                        className="tooltip-icon-button">
                        <Icon icon={code} />
                    </button>
                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'list')}
                        className="tooltip-icon-button">
                        <Icon icon={list} />
                    </button>
                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'underline')}
                        className="tooltip-icon-button">
                        <Icon icon={underline} />
                    </button>                    
                </FormatToolbar>
                <Editor 
                    value={this.state.value} 
                    onChange={this.onChange} 
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}
                />
            </Fragment>
        )
    }
}