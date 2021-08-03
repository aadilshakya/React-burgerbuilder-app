import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter  from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()})

describe('<NavigationItems/>',()=>{
    it('should render navigation items',()=>{
        const wrapper = shallow(<NavigationItems/>)
        expect(wrapper.find(NavigationItem)).toHaveLength(3);

    });

    it('should render navigation items',()=>{
        const wrapper = shallow(<NavigationItems/>)
        expect(wrapper.contains(<NavigationItem link="/orders">Orders</NavigationItem>)).toEqual(true);

    })
})