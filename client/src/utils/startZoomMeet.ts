import { ZoomMtg } from '@zoomus/websdk';
import { generateZoomSignatureForUser } from './index';

export const startZoomMeet = async ({
    meetingNumber,
    sdkKey,
    sdkSecret,
    leaveUrl,
    password,
    userName,
    onSuccess = () => {},
    onError = () => {}
}: ZoomConfigType) => {
    try {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/3.1.0/lib", "/av");
        ZoomMtg.preLoadWasm()
        ZoomMtg.prepareWebSDK()
        const signature = await generateZoomSignatureForUser({
            meetingNumber,
            sdkKey,
            sdkSecret,
        })
        ZoomMtg.init({
            leaveUrl,
            success: () => {

                ZoomMtg.join({
                    sdkKey,
                    signature,
                    meetingNumber,
                    passWord: password,
                    userName,
                    success: onSuccess,
                    error: onError
                })
            },
            error: onError
        })
    } catch (err: ZoomResponseType | unknown) {
        onError(err);
    }
}