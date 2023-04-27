import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
    const { name, color, userID } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name });
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach((doc) => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis()),
                });
            });
            setMessages(newMessages);
        });
        return () => {
            if (unsubMessages) unsubMessages();
        };

    }, []);

    const addMessagesItem = async (newMessage) => {
        const newMessageRef = await addDoc(
            collection(db, "messages"),
            newMessage[0]
        );
        if (!newMessageRef.id) {
            Alert.alert(
                "There was an error sending your message. Please try again later"
            );
        }
    };

    const onSend = (newMessages) => {
        addMessagesItem(newMessages);
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: color === "white" ? "black" : "white",
                    },
                }}
                wrapperStyle={{
                    right: {
                        backgroundColor: color,
                    },
                    left: {
                        backgroundColor: "#FFF",
                    },
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <GiftedChat
                style={styles.textingBox}
                messages={messages}
                renderBubble={renderBubble}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: userID,
                }}
                name={{ name: name }}
            />
            {Platform.OS === "android" ? (
                <KeyboardAvoidingView behavior='height' />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textingBox: {
        flex: 1,
    },
});

export default Chat;