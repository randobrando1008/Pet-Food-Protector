import {StyleSheet} from 'react-native'

const externalStyle=StyleSheet.create({
    lineStyle:{
        borderWidth: 2,
        borderColor: "#00A5FF",
        borderRadius: 35,
        margin: 10,
        marginTop: 30
    },
    scrollView: {
        marginHorizontal: 20,
    },
    primaryButtonContainer: {
        backgroundColor: "#00A5FF",
        borderRadius: 35,
        width: 190,
        height: 50,
        justifyContent: 'center',
        alignSelf: "center",
        margin: 5,
        marginTop: 150,
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
    }
})

export default externalStyle