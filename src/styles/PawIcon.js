import React, {useState} from 'react';
import type {Node} from 'react';
import { View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

const PawIcon = ({}) => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="paw" size={48} color="#000000CC" backgroundColor="#FFFFFF00"/>
    </View>
);

export default PawIcon