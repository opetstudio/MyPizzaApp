import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "rgba(231, 95, 95, 1)",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(231, 95, 95, 0.5)",
  },
  buttonText: {
    color: "#fff",
  },
  modalContent: {
    backgroundColor: "rgba(242, 242, 242, 1)",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  uniCoin: {
    flexDirection: 'row',
  },
  headCoin: {
    fontSize: 20,
    color: "rgba(33, 118, 222, 1)",
    fontWeight: '800',
    marginBottom: 10,
  },
  descCoin: {
    fontSize: 12,
  },
  descCoinTitle: {
    fontSize: 12,
    fontWeight: '700',
  }
});