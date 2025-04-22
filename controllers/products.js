const Product = require('../model/product')


/*testing get all*/ 
const getAllproductsStatic = async (req,res) => {
  const products = await Product.find({}).sort('-name price')
  res.status(200).json({products,nbHits:products.length})
}


/*--------------------------------------------------*/


 const getAllproducts = async (req,res) => {
  const {featured, company, name ,sort , field , limit , skip , numFilter} = req.query;
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === 'true'? true : false;
  } 
  if (company) {
    queryObject.company = company;
  } 
  if (name) {
    queryObject.name = {$regex:name , $options:'i'};
  } 
  if (numFilter) {
    const operatorMap = {
      '>':'$gt',
      '>=':'$gte',
      '<':'$lt',
      '<=':'$lte',
      '=':'$eq'
    }
    const regEx = /\b(>|>=|<|<=|=)\b/g
    let filters = numFilter.replace(regEx,(match)=>`-${operatorMap[match]}-`)
    const options = ['price','rating'];
    filters = filters.split(',').forEach((item)=>{
      const [field,operator,value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = {[operator]:Number(value)};
      }
    })
  }
  //sort
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }
  else{
    result = result.sort('createdAt')
  }
  //field

  if (field) {
    const fieldList = field.split(',').join(' ');
    result = result.select(fieldList);
  } 
  //limit
  if (limit) {
    const LimitList = limit.split(',').join(' ');
    result = result.limit(LimitList);
  }
  //skip
  if (skip) {
    const SkipList = skip.split(',').join(' ');
    result = result.skip(SkipList);
  }
  const products = await result
  res.status(200).json({products , nbHits:products.length})
}



module.exports = {getAllproducts,getAllproductsStatic};