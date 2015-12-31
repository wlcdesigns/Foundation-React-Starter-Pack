var heading = document.querySelector(".welcome-message");

var ReactLogo = React.createClass({
	getInitialState: function() {
		return {
			src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/React.js_logo.svg/600px-React.js_logo.svg.png",
		}
	},
	render: function() {
		return (
			<div className="large-12 columns">
				<h1>Welcome to Foundation <img src={this.state.src} alt="React.js" /></h1>
			</div>
		);
	}
});

ReactDOM.render(<ReactLogo />, heading);
