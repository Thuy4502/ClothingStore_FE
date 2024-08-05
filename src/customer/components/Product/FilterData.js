export const filters = [
  {
    id: 'gender',
    name: 'Gender',
    options: [
      { value: 'man', label: 'Man', checked: false },
      { value: 'woman', label: 'Woman', checked: false },
      { value: 'unisex', label: 'Unisex', checked: false },
      
    ],
  },
  ,
  {
    id: 'colors',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'black', label: 'Black', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },


  {
    id: 'category',
    name: 'Category',
    options: [
      { value: '1', label: 'T-shirt', checked: false },
      { value: '2', label: 'Paints', checked: false },
      { value: '3', label: 'Dress', checked: false },
      // { value: 'organization', label: 'Organization', checked: false },
      // { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: '25', label: '$25', checked: false },
      { value: '50', label: '$50', checked: false },
      { value: '100', label: '$100', checked: false },
      { value: '200', label: '$200', checked: false },
    ],

  }
]

export const singleFilter=[
  
  {
    id: "price",
    name: "Price",
    options: [
      { value: '25', label: '$25', checked: false },
      { value: '50', label: '$50', checked: false },
      { value: '100', label: '$100', checked: false },
      { value: '200', label: '$200', checked: false },
    ],

  }
]