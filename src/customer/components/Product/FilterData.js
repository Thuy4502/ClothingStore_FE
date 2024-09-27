export const filters = [
  {
    id: 'gender',
    name: 'Gender',
    options: [
      { value: 'men', label: 'Men', checked: false },
      { value: 'women', label: 'Women', checked: false },
      { value: 'unisex', label: 'Unisex', checked: false },



    ],
  },
  ,
  {
    id: 'colors',
    name: 'Color',
    options: [
      { value: 'White', label: 'White', checked: false },
      { value: 'Black', label: 'Black', checked: false },
      { value: 'Blue', label: 'Blue', checked: false },
      { value: 'Brown', label: 'Brown', checked: false },
      { value: 'Green', label: 'Green', checked: false },
      { value: 'Gray', label: 'Gray', checked: false },
      { value: 'Pink', label: 'Pink', checked: false },
      { value: 'Red', label: 'Red', checked: false },
      { value: 'Beige', label: 'Beige', checked: false },



    ],
  },


  {
    id: 'category',
    name: 'Category',
    options: [
      { value: '1', label: 'T-shirt', checked: false },
      { value: '3', label: 'Paints', checked: false },
      { value: '2', label: 'Dress', checked: false },
      { value: '4', label: 'Jacket', checked: false },
      { value: '5', label: 'Short', checked: false },
      { value: '6', label: 'Hoodie', checked: false },
      { value: '7', label: 'Shirt', checked: false },


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
      { value: 'over-200', label: 'Over $200', checked: false },
    ],

  }
]

export const singleFilter = [

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