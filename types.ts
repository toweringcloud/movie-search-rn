import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//-reference : https://til-choonham.tistory.com/m/537
type StackParamList = {
	Home: undefined;
	Stack: {
		screen: string;
	};
};
export type StackNavigationProp = NativeStackNavigationProp<StackParamList>;
