import React, { useRef } from "react";
import { Animated, Dimensions, PanResponder, StyleSheet, TouchableOpacity } from "react-native";



import { Bug } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

interface DraggableFABProps {
    onPress: () => void;
}

const DraggableFAB: React.FC<DraggableFABProps> = ({ onPress }) => {

    const pan = useRef(new Animated.ValueXY({ x: width - 80, y: height - 180 })).current;

    // Track current position for calculations
    const currentPosition = useRef({ x: width - 80, y: height - 180 });

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // Update current position reference
                currentPosition.current = {
                    x: (pan.x as any)._value,
                    y: (pan.y as any)._value,
                };

                pan.setOffset({
                    x: currentPosition.current.x,
                    y: currentPosition.current.y,
                });
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: () => {
                pan.flattenOffset();

                // Update current position after movement
                currentPosition.current = {
                    x: (pan.x as any)._value,
                    y: (pan.y as any)._value,
                };

                // Snap to nearest edge
                Animated.spring(pan.x, {
                    toValue: currentPosition.current.x > width / 2 ? width - 70 : 10,
                    useNativeDriver: false,
                }).start();
            },
        })
    ).current;

    return (
        <Animated.View style={[styles.fab, { transform: pan.getTranslateTransform() }]} {...panResponder.panHandlers}>
            <TouchableOpacity onPress={onPress} style={styles.fabButton}>
                <Bug size={24} color={"#000000"} />
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        zIndex: 999,
        elevation: 999,
    },
    fabButton: {
        backgroundColor: "transparent",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
});

export { DraggableFAB };
