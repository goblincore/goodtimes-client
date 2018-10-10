import React from 'react';
import { shallow, mount } from 'enzyme';
import States from './states';

function setup(){
  const props = {
    states : [ 
      {value:null, name: 'Select a State'},
      {value:'AL',name:'Alabama'},
      {value:'AK',name:'Alaska'},
      {value:'AZ',name:'Arizona'},
      {value:'AR',name:'Arkansas'},
      {value:'CA',name:'California'},
      {value:'CO',name:'Colorado'},
      {value:'CT',name:'Connecticut'},
      {value:'DE',name:'Delaware'},
      {value:'DC',name:'District Of Columbia'},
      {value:'FL',name:'Florida'},
      {value:'GA',name:'Georgia'},
      {value:'HI',name:'Hawaii'},
      {value:'ID',name:'Idaho'},
      {value:'IL',name:'Illinois'},
      {value:'IN',name:'Indiana'},
      {value:'IA',name:'Iowa'},
      {value:'KS',name:'Kansas'},
      {value:'KY',name:'Kentucky'},
      {value:'LA',name:'Louisiana'},
      {value:'ME',name:'Maine'},
      {value:'MD',name:'Maryland'},
      {value:'MA',name:'Massachusetts'},
      {value:'MI',name:'Michigan'},
      {value:'MN',name:'Minnesota'},
      {value:'MS',name:'Mississippi'},
      {value:'MO',name:'Missouri'},
      {value:'MT',name:'Montana'},
      {value:'NE',name:'Nebraska'},
      {value:'NV',name:'Nevada'},
      {value:'NH',name:'New Hampshire'},
      {value:'NJ',name:'New Jersey'},
      {value:'NM',name:'New Mexico'},
      {value:'NY',name:'New York'},
      {value:'NC',name:'North Carolina'},
      {value:'ND',name:'North Dakota'},
      {value:'OH',name:'Ohio'},
      {value:'OK',name:'Oklahoma'},
      {value:'OR',name:'Oregon'},
      {value:'PA',name:'Pennsylvania'},
      {value:'RI',name:'Rhode Island'},
      {value:'SC',name:'South Carolina'},
      {value:'SD',name:'South Dakota'},
      {value:'TN',name:'Tennessee'},
      {value:'TX',name:'Texas'},
      {value:'UT',name:'Utah'},
      {value:'VT',name:'Vermont'},
      {value:'VA',name:'Virginia'},
      {value:'WA',name:'Washington'},
      {value:'WV',name:'West Virginia'},
      {value:'WI',name:'Wisconsin'},
      {value:'WY',name:'Wyoming'}
    ]
  };
  const enzymeWrapper = mount(<States {...props} localStorage={localStorage}/>);
  return {
    props,
    enzymeWrapper
  };
}

describe('states list', () => {
  it('should return an array of options', () => {
    const {props, enzymeWrapper} = setup();
    const options = enzymeWrapper.find('option');
    expect(options.length).toEqual(props.states.length);
  });
});