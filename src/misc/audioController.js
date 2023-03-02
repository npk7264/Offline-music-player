import { Audio } from "expo-av";
//play audio
export const play = async (playbackObj, uri) => {
    try {
        return await playbackObj.loadAsync(
            { uri },
            { shouldPlay: true }
        );
    } catch (error) {
        console.log('error inside play helper method', error.message)
    }
}

//pause audio
export const pause = async (playbackObj) => {
    try {
        return await playbackObj.setStatusAsync({ shouldPlay: false, });
    } catch (error) {
        console.log('error inside pause helper method', error.message)
    }
}

//resume audio
export const resume = async (playbackObj) => {
    try {
        return await playbackObj.playAsync();
    } catch (error) {
        console.log('error inside resume helper method', error.message)
    }
}

//select another audio
export const playNext = async (playbackObj, uri) => {
    try {
        await playbackObj.stopAsync();
        await playbackObj.unloadAsync();
        return await play(playbackObj, uri);
    } catch (error) {
        console.log('error inside playNext helper method', error.message)
    }
}
//event press audio
export const handleAudioPress = async (audio, data, contextType) => {
    // playing audio for the first time
    if (contextType.soundObj === null) {
        console.log('play');
        const playbackObj = new Audio.Sound();
        const status = await play(playbackObj, audio.uri);
        const index = data.indexOf(audio);
        contextType.updateState(contextType, {
            currentAudio: audio,
            playbackObj: playbackObj,
            soundObj: status,
            currentAudioIndex: index,
            isPlaying: true,
            activePlayList: data,
        });
        return playbackObj.setOnPlaybackStatusUpdate(contextType.onPlaybackStatusUpdate)
    }


    //pause audio
    if (contextType.soundObj.isLoaded
        && contextType.soundObj.isPlaying
        && contextType.currentAudio.id === audio.id) {
        console.log('pause');
        const status = await pause(contextType.playbackObj)
        return contextType.updateState(contextType, {
            soundObj: status,
            isPlaying: false,
            playbackPosition: status.positionMillis,
        });
    }

    //resume audio
    if (contextType.soundObj.isLoaded
        && !contextType.soundObj.isPlaying
        && contextType.currentAudio.id === audio.id) {
        console.log('resume');
        const status = await resume(contextType.playbackObj);
        return contextType.updateState(contextType, {
            soundObj: status,
            isPlaying: true,
        });
    }

    // select another audio
    if (contextType.soundObj.isLoaded && contextType.currentAudio.id !== audio.id) {
        console.log('another');
        const status = await playNext(contextType.playbackObj, audio.uri);
        const index = data.indexOf(audio);
        return contextType.updateState(contextType, {
            currentAudio: audio,
            soundObj: status,
            isPlaying: true,
            currentAudioIndex: index,
            activePlayList: data,
        });
    }
}