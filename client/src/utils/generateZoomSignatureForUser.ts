import { ZoomMtg } from '@zoomus/websdk';

export const generateZoomSignatureForUser = ({
  meetingNumber,
  sdkKey,
  sdkSecret,
}: GenerateZoomSignForUserArgsType): Promise<string> => new Promise((res, rej) => {
    ZoomMtg.generateSDKSignature({
      role: "0",
      meetingNumber,
      sdkKey,
      sdkSecret,
      success: function (response:ZoomResponseType) {
        res(response.result || "")
      },
      error: function(err: ZoomResponseType){
        rej(err.toString());
      }
    })
})