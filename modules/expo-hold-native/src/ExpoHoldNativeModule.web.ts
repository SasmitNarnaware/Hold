import { registerWebModule, NativeModule } from 'expo';

class ExpoHoldNativeModule extends NativeModule<{}> {}

export default registerWebModule(ExpoHoldNativeModule, 'ExpoHoldNativeModule');
