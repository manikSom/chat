import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ isConnected, db, route, navigation }) => {
    const { name, color, userID } = route.params;
    const [messages, setMessages] = useState([]);
    let unsubMessages;

    useEffect(() => {
        navigation.setOptions({ title: name });
        if (isConnected === true) {
            if (unsubMessages) unsubMessages();
            unsubMessages = null;
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach((doc) => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis()),
                    });
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();
        return () => {
            if (unsubMessages) unsubMessages();
        };

    }, [isConnected]);
    const loadCachedMessages = async () => {
        const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
        setMessages(JSON.parse(cachedMessages));
    };
    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    };

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

    const renderInputToolbar = (props) => {
        if (isConnected) {
            return <InputToolbar {...props} />;
        } else {
            return null;
        }
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
                renderInputToolbar={renderInputToolbar}
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