'use strict';

var Product = React.createClass({
  propTypes: {
    obj: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      price: React.PropTypes.string.isRequired,
      shop_id: React.PropTypes.number.isRequired,
      primary_image: React.PropTypes.shape({
        url: React.PropTypes.string,
      })
    }).isRequired
  },

  renderImage: function() {
    if (this.props.obj.primary_image) {
      return (
        <img src={this.props.obj.primary_image.url} />
      );
    } else {
      return (<img />);
    }
  },

  render: function () {
    return (
      <div className="product">
        <h3>{ this.props.obj.name } <span>{ this.props.obj.price } €</span></h3>
        {this.renderImage()}
      </div>
    );
  }
});

var App = React.createClass({
  propTypes: {
    content: React.PropTypes.array
  },
  render: function () {
    return (
      <div className="stream">
        { this.props.content.map(function(product){
          return <Product obj={product} />;
        }) }
      </div>
    );
  }
});

var render = function (products) {
  React.render(
    <App content={products} />,
    document.getElementById('container')
  );
};

$(function() {
  var l = window.loader;
  render([]);

  l.getNextPage().then(function() {
    render(l.getAllProducts());
  });
})
