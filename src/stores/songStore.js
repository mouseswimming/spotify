import { defineStore } from "pinia";
import artist from "../data/artistMock.json";

export const useSongStore = defineStore("song", {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentArtist: null,
    currentTrack: null,
  }),
  actions: {
    loadSong(artist, track) {
      this.currentArtist = artist;
      this.currentTrack = track;

      // pause and clear the audio if there is audio existed
      if (this.audio && this.audio.src) {
        this.audio.pause();
        this.isPlaying = false;
        this.audio.src = "";
      }

      this.audio = new Audio();
      this.audio.src = track.path;

      setTimeout(() => {
        this.audio.play(0);
        this.isPlaying = true;
      }, 200);
    },
    playOrPauseSong() {
      if (this.audio.paused) {
        this.isPlaying = true;
        this.audio.play();
      } else {
        this.isPlaying = false;
        this.audio.pause();
      }
    },
    playOrPauseSelectSong(artist, track) {
      if (!this.audio || !this.audio.src || this.currentTrack.id !== track.id) {
        // when new track is played, load and song and play
        this.loadSong(artist, track);
        return;
      }

      this.playOrPauseSong();
    },
    prevSong(currentTrack) {
      let trackIndex = artist.tracks.findIndex(
        (track) => track.id === currentTrack.id
      );

      if (trackIndex !== undefined) {
        trackIndex = trackIndex > 0 ? trackIndex - 1 : 0;
        this.loadSong(artist, artist.tracks[trackIndex]);
      }
    },
    nextSong(currentTrack) {
      let trackIndex = artist.tracks.findIndex(
        (track) => track.id === currentTrack.id
      );

      if (trackIndex !== undefined) {
        trackIndex = trackIndex < artist.tracks.length - 1 ? trackIndex + 1 : 0;
        this.loadSong(artist, artist.tracks[trackIndex]);
      }
    },
    playFromFirst() {
      this.resetState();
      let track = artist.tracks[0];
      this.loadSong(artist, track);
    },
    resetState() {
      this.isPlaying = false;
      this.audio = null;
      this.currentArtist = null;
      this.currentTrack = null;
    },
  },
  persist: true,
});
