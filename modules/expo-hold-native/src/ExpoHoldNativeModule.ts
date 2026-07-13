import { NativeModule, requireNativeModule } from 'expo';

declare class ExpoHoldNativeModule extends NativeModule<{}> {}

export default requireNativeModule<ExpoHoldNativeModule>('ExpoHoldNative');
