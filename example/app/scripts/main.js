'use strict';

var l = window.loader,
    jank = window.jank,
    jankWorker = new Worker('scripts/worker.js');

jankWorker.onmessage = function(e) {
  console.log('Worker: ' + e.data);
};

var Spinner = React.createClass({

  render: function() {
    return (
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    );
  }
});


var Product = React.createClass({
  getInitialState: function() {
    return {
      clicked: false,
    };
  },

  handleClick: function(e) {
    e.stopPropagation();

    jankWorker.postMessage('Do something');
    this.setState({clicked: !this.state.clicked});
  },

  render: function() {
    if (this.state.clicked) {
      return (
        <div onClick={this.handleClick}>
          <ProductBacksite product={this.props.product} />
        </div>
      );
    } else {
      return (
        <div onClick={this.handleClick}>
          <ProductFrontsite product={this.props.product}  />
        </div>
      );
    }
  }
});


var ProductFrontsite = React.createClass({
  propTypes: {
    product: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      price: React.PropTypes.string.isRequired,
      shop_id: React.PropTypes.number.isRequired,
      primary_image: React.PropTypes.shape({
        url: React.PropTypes.string,
      })
    }).isRequired
  },

  renderImage: function() {
    if (this.props.product.primary_image) {
      return (
        <img src={this.props.product.primary_image.url} />
      );
    } else {
      return (<img />);
    }
  },

  render: function() {
    return (
      <div className="product">
        <h3>{ this.props.product.name } <span>{ this.props.product.price }</span></h3>
        {this.renderImage()}
      </div>
    );
  }
});

var ProductBacksite = React.createClass({
  getInitialState: function() {
    return {
      shopLoaded: false,
      shopProductsLoaded: false,
      shop: {},
      shopProducts: {},
    };
  },

  componentWillMount: function() {
    var shop = this.props.product.shop_subdomain;

    l.getShop(shop).then(function(shop) {

      jankWorker.postMessage('Do something');
      this.setState({
        shop,
        shopLoaded: true,
      });
    }.bind(this));

    l.getShopProducts(shop).then(function(res) {
      var shopProducts = res.results;

      jankWorker.postMessage('Do something');
      this.setState({
        shopProducts,
        shopProductsLoaded: true,
      });
    }.bind(this));
  },

  renderShop: function() {
    if (this.state.shopProductsLoaded) {
      var s = this.state.shop;
      return (
        <div>
          <h3>{ s.name }</h3>
          <dl>
            <dt>Street</dt>
            <dd>{ s.street }</dd>
            <dt>ZIP</dt>
            <dd>{ s.zipcode }</dd>
            <dt>City</dt>
            <dd>{ s.city }</dd>
            <dt>Phone</dt>
            <dd>{ s.phone }</dd>
            <dt>Description</dt>
            <dd>{ s.description }</dd>
          </dl>
        </div>
      );
    } else {
      return (
        <Spinner />
      );
    }
  },

  renderShopProducts: function() {
    if (this.state.shopProductsLoaded) {
      return (
        <div>
          { this.state.shopProducts.map(function(p){
            return <Product key={'shop-product-' + p.id} product={p} />;
          }) }
        </div>
      );
    } else {
      return (
        <Spinner />
      );
    }
  },

  render: function() {
    return (
      <div className="product">
        <div className="row">
          { this.renderShop() }
        </div>

        <div className="row">
        { this.renderShopProducts() }
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  propTypes: {
    content: React.PropTypes.array
  },
  render: function() {
    return (
      <div className="stream">
        { this.props.content.map(function(p){
          return <Product key={p.id} product={p} />;
        }) }
      </div>
    );
  }
});

var render = function() {
  React.render(
    <App content={l.getAllProducts()} />,
    document.getElementById('container')
  );
};

$(function() {
  render([]);

  l.getNextPage().then(function() {
    render();
  });

  $(window).on('scroll', function() {
    var border = $(document).height() * 0.9;
    if ($(window).scrollTop() > border && !l.isLoading()) {

      l.getNextPage().then(function() {
        render();
      });
    }
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/scripts/cachingServiceWorker.js').then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
} else {
  console.log('You cant use service worker in this browser, sorry :(');
};


