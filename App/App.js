class ProductCategoryRow extends React.Component {
    render() {
      return <tr><th colSpan="2">{this.props.category}</th></tr>;
    }
  }
  class ProductRow extends React.Component {
    render() {
      let {inStockOnly,filterText,Name,Price,Stocked} = this.props
      var reg = new RegExp(filterText)
      if(inStockOnly){
        // console.log('现在的状态是true')
        if(Stocked === true){
          if(reg.test(Name)){
            var name = Name
            var price = Price
          }
          var name = Name
          var price = Price
        }
      }else{
          if(reg.test(Name)){
            var name = Stocked ?
              Name:
              <span style={{color: 'red'}}>
                {Name}
              </span>;
            var price = Price
            var price = Price
          }
      }
      return (
        <tr>
          <td>{name}</td>
          <td>{price}</td>
        </tr>
      );
    }
  }

  class ProductTable extends React.Component {
    render() {
      var rows = [];
      var lastCategory = null;
      // var inStockOnly = this.props.inStockOnly
      // var filterText = this.props.filterText
      let {inStockOnly,filterText} = this.props
      this.props.products.forEach(function(product) {
        if (product.category !== lastCategory) {//这是不等于的时候才做的事情
          rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
        }
        rows.push(<ProductRow inStockOnly={inStockOnly} filterText={filterText} Stocked={product.stocked} Price={product.price} key={product.name} Name={product.name} />);
        lastCategory = product.category;
      });
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }

  class SearchBar extends React.Component {
    hadleClickInput=(e)=>{
      // var target = e.target
      // var value = target.type === 'checkbox' ? target.checked: target.value
      // target.type === 'checkbox' ? this.props.onCheckedChange(value):this.props.onValueChange(value)
      this.props.onClickHandle(e)
    }
    render() {
      return (
        <div>
          <input type="text" placeholder="Search..." onChange={this.hadleClickInput} value={this.props.filterText} />
          <p>
            <input type="checkbox"  onChange={this.hadleClickInput}  checked={this.props.inStockOnly}/>
            {' '}
            Only show products in stock
          </p>
        </div>
      );
    }
  }

  class FilterableProductTable extends React.Component {
    constructor(props){
      super(props)
      this.state={
        filterText:'',
        inStockOnly:false
      }
    }
  // handleCheckedChange=(CheckValue)=>{
  //   this.setState({
  //     inStockOnly:CheckValue
  //   })
  // }
  // handleValueChange=(InputValue)=>{
  //   this.setState({
  //     filterText:InputValue
  //   })
  // }
  handleChange=(e)=>{
    var target = e.target
    var value = target.type === 'checkbox' ? target.checked : target.value
    target.type === 'checkbox'? this.setState({inStockOnly:value}):this.setState({filterText:value})
  }
    render() {
      return (
        <div>
          <SearchBar onCheckedChange={this.handleCheckedChange} onClickHandle={this.handleChange}  filterText={this.state.filterText}  inStockOnly={this.state.inStockOnly}/>
          <ProductTable products={this.props.products} filterText={this.state.filterText}  inStockOnly={this.state.inStockOnly} />
        </div>
      );
    }
  }


  var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];

  ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
  );
