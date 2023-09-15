import React, {useState} from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';

function MyTextInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}) {
  const [togglePass, setTogglePass] = useState(secureTextEntry ? true : false);

  return (
    <View style={{marginBottom: 20}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 5,
        }}>
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 10,
          paddingLeft: 10,
        }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            fontSize: 16,
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={togglePass}
          keyboardType={keyboardType}
        />
        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setTogglePass(!togglePass)}
            style={{padding: 5}}>
            <Text>{togglePass ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

export default MyTextInput;
