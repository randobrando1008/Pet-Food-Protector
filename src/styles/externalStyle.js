import {StyleSheet} from 'react-native'

const externalStyle=StyleSheet.create({
    lineStyle:{
        borderWidth: 2,
        borderColor: "#00A5FF",
        borderRadius: 35,
        margin: 10,
        marginTop: 15
    },
    scrollView: {
        marginHorizontal: 20,
    },
    primaryButtonContainer: {
        backgroundColor: "#00A5FF",
        borderRadius: 35,
        width: 190,
        height: 50,
        justifyContent: "center",
        alignSelf: "center",
        margin: 5,
        marginTop: 50,
    },
    primaryButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center"
    },
    secondaryButtonContainer: {
        backgroundColor: "#fff",
        borderColor: "#00A5FF",
        borderWidth: 2,
        borderRadius: 35,
        width: 190,
        height: 50,
        justifyContent: 'center',
        alignSelf: "center",
        margin: 5
    },
    secondaryButtonText: {
        fontSize: 18,
        color: "#00A5FF",
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center"
    },
    extraText: {
        color: '#C4C4C4',
        fontSize: 18,
        width: 265,
        justifyContent: 'center',
        alignSelf: "center",
        padding: 2,
        margin: 5
    },
    inputStyle: {
        borderColor: '#C4C4C4',
        borderWidth: 1,
        borderRadius: 20,
        fontSize: 14,
        width: 255,
        height: 40,
        justifyContent: 'center',
        alignSelf: "center",
        margin: 5
    },
    header: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap:'wrap'
    },
    headerText: {
        padding: 2,
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24,
        justifyContent: 'center',
        alignSelf: "center",
        margin: 5,
        marginTop: 15
  }
})

export default externalStyle