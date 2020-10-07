import Autosuggest from "react-autosuggest";
import React from "react";
import {connect} from "react-redux";

const getSuggestions = value => {
	console.log(this.state, this.props);
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;

	return inputLength === 0
		? []
		: this.props.posts.filter(
				post =>
					post.description.toLowerCase().slice(0, inputLength) === inputValue
		  );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => <div>{suggestion.description}</div>;

class SearcInPosts extends React.Component {
	constructor() {
		super();
		this.state = {
			value: "",
			suggestions: []
		};
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
			this
		);
		this.onChange = this.onChange.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
			this
		);
	}

	onChange = (event, {newValue}) => {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({value}) => {
		this.setState({
			suggestions: getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		const {value, suggestions} = this.state;

		const inputProps = {
			placeholder: "Search...",
			value,
			onChange: this.onChange
		};

		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		posts: state.post.allPosts
	};
};

export default connect(mapStateToProps)(SearcInPosts);
