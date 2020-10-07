import Autosuggest from "react-autosuggest";
import React from "react";
import {connect} from "react-redux";

class SearcInPosts extends React.Component {
	constructor(props) {
		super(props);
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
		this.getSuggestionValue = this.getSuggestionValue.bind(this);
		this.renderSuggestion = this.renderSuggestion.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
	}

	getSuggestions(value) {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		return inputLength === 0
			? []
			: this.props.posts.filter(
					post =>
						post.description.toLowerCase().slice(0, inputLength) ===
							inputValue ||
						post.title.toLowerCase().slice(0, inputLength) === inputValue
			  );
	}

	getSuggestionValue = suggestion => suggestion.name || suggestion.name;

	renderSuggestion = suggestion => (
		<div>{suggestion.description || suggestion.title}</div>
	);

	onChange = (event, {newValue}) => {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({value}) => {
		this.setState({
			suggestions: this.getSuggestions(value)
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
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={this.renderSuggestion}
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
