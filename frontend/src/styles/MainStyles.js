import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    marginVertical: 15,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    color: 'black',
    width: '50%',
  },
  btnContainer: {
    backgroundColor: 'blue',
    borderRadius: 100,
    padding: 15,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});

export {styles};
