import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Masonry from 'react-masonry-css';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Reply } from 'lucide-react'; 
import axios from 'axios'; 
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import LottieAnimationCat from "@/components/ui/LottieAnimationCat";

interface Voice {
  id: number;
  voice: string;
  timestamp: string;
  isPrivate: boolean;
  replies: string;
}

const MAX_CHAR_LIMIT = 1000;

export default function Voices() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [newVoice, setNewVoice] = useState('');
  const [newReply, setNewReply] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState<number | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newVoiceCharCount, setNewVoiceCharCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [newReplyCharCount, setNewReplyCharCount] = useState(0);

  const now = new Date();
  const jakartaOffset = 0;
  const wibTime = new Date(now.getTime() + jakartaOffset);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  });

  useEffect(() => {
    const cachedVoices = sessionStorage.getItem('voicesData');
    
    if (cachedVoices) {
      const cachedVoicesArray = JSON.parse(cachedVoices);
      setVoices(cachedVoicesArray);
    } else {
      const fetchVoices = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get('https://be-daf2a.vercel.app/api/notion-voices');
          
          if (Array.isArray(response.data)) {
            const reversedVoices = response.data.reverse();
            setVoices(reversedVoices);
            sessionStorage.setItem('voicesData', JSON.stringify(reversedVoices));
          } else {
            console.error('Invalid data format:', response.data);
          }
        } catch (error) {
          console.error('Error fetching voices:', error);
        } finally {
            setIsLoading(false);
        }
      };
      
      fetchVoices();
    }
  }, []);

  const handleSubmit = async () => {
    if (newVoice.trim() === '') {
      toast.error('Voice cannot be empty!', { position: 'bottom-right' });
      return;
    }

    if (newVoice.length > MAX_CHAR_LIMIT) {
      toast.error('Voice exceeds 1000 characters!', { position: 'bottom-right' });
      return;
    }

    setLoading(true);
    const newVoiceData = {
      id: voices.length + 1,
      replies: "",
      voice: newVoice,
      timestamp: wibTime.toISOString(),
      isPrivate: isPrivate,
    };

    try {
      await axios.post('https://be-daf2a.vercel.app/api/notion-voices', newVoiceData);
      if (!newVoiceData.isPrivate){
        const updatedVoices = [...voices, newVoiceData];
        setVoices(updatedVoices);
        sessionStorage.setItem('voicesData', JSON.stringify(updatedVoices));
      }
      setNewVoice('');
      setNewVoiceCharCount(0);
      setIsPrivate(false);
      setIsDialogOpen(false);
      toast.success('Voice submitted successfully!', {
        description: isPrivate ? 'Your voice is private' : 'Your voice is public',
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error adding voice:', error);
      toast.error('Error submitting voice', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async () => {
    if (newReply.trim() === '') {
      toast.error('Reply cannot be empty!', { position: 'bottom-right' });
      return;
    }

    if (newReply.length > MAX_CHAR_LIMIT) {
      toast.error('Reply exceeds 1000 characters!', { position: 'bottom-right' });
      return;
    }

    if (selectedVoiceId) {
      setLoading(true);
      try {
        await axios.patch('https://be-daf2a.vercel.app/api/notion-voices', {
          id: selectedVoiceId,
          reply: newReply,
        });

        const updatedVoices = voices.map((voice) => {
          if (voice.id === selectedVoiceId) {
            return {
              ...voice,
              replies: voice.replies ? voice.replies + '; ' + newReply : newReply,
            };
          }
          return voice;
        });

        setVoices(updatedVoices);
        sessionStorage.setItem('voicesData', JSON.stringify(updatedVoices));
        setNewReply('');
        setNewReplyCharCount(0);
        setSelectedVoiceId(null);
        setIsReplyDialogOpen(false);
        toast.success('Reply added successfully', {
          position: 'bottom-right',
        });
      } catch (error) {
        console.error('Error adding reply:', error);
        toast.error('Error adding reply', {
          position: 'bottom-right',
        });
      } finally {
        setLoading(false); 
      }
    }
  };

  const splitReplies = (replies: string): string[] => {
    if (!replies) return [];
    return replies.split(';').map((reply: string) => reply.trim());
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const fadeStyle = {
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
  };

  return (
    <>
    <AnimatePresence>
        {isLoading && (
        <motion.div
            className="fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <LottieAnimationCat />
        </motion.div>
        )}
    </AnimatePresence>

    <div className="fixed top-0 -z-50 h-screen w-full">
        <div className="h-screen w-full dark:bg-transparent bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.05] items-center justify-center"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
    </div>

    <div className="text-zinc-200" style={fadeStyle}>
      <Toaster position="bottom-right" className="z-50"/>

      <div className={`transition-all duration-300 ${isDialogOpen || isReplyDialogOpen ? 'blur-sm brightness-50' : ''}`}>
        <div className="container mx-auto p-4 pb-20">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {voices.slice().reverse().map((voice) => (
            <div key={voice.id} className="mb-4">
                <div className="border border-zinc-800 rounded-lg p-4 shadow-sm bg-zinc-900">
                <p className="text-zinc-200 text-left">{voice.voice}</p>

                <div className="flex items-center justify-between mt-2">
                    <div
                        onClick={() => {
                            setSelectedVoiceId(voice.id);
                            setIsReplyDialogOpen(true);
                        }}
                        className="flex items-center text-zinc-500 mr-2 hover:text-zinc-600 cursor-pointer">
                        <Reply/>
                        <p className="text-sm ml-2 mt-0.5"> Reply</p>
                    </div>
                    <p className="text-sm text-zinc-500 text-right">
                        {format(new Date(voice.timestamp), 'HH:mm, MMM dd yyyy')}
                    </p>
                </div>

                {voice.replies && (
                    <div className="reply-hierarchy mt-4">
                    {splitReplies(voice.replies).map((reply, index) => (
                        <div key={index} className="reply-text-wrapper">
                        <p className="reply-text mt-1 text-left">{reply}</p>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            </div>
            ))}
          </Masonry>
        </div>
      </div>

      {/* Add new voice */}
      <div className={`z-30 fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 py-4 transition-all duration-300 ${isDialogOpen ? 'blur-sm brightness-50' : ''}`}>
        <div className="container mx-auto px-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-zinc-800 hover:bg-zinc-600 text-zinc-200">
                ✉️ New Item (Anonymous)
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-zinc-200 rounded-xl border-zinc-800">
              <DialogHeader>
                <DialogTitle className="text-zinc-200">Add Yours</DialogTitle>
              </DialogHeader>
              <div>
                <Textarea
                    placeholder="Type your voice here (max 1000 characters)"
                    value={newVoice}
                    onChange={(e) => {
                    setNewVoice(e.target.value);
                    setNewVoiceCharCount(e.target.value.length);
                    }}
                    className="col-span-3 bg-zinc-800 text-zinc-200 border-zinc-700 rounded-md"
                />
                
                <p className="text-xs text-zinc-500 pt-2 pb-2">{newVoiceCharCount}/{MAX_CHAR_LIMIT} characters</p>

                <div className="flex items-center gap-2">
                    <Switch
                    id="private-mode"
                    checked={isPrivate}
                    onCheckedChange={(checked) => setIsPrivate(checked)}
                    />
                    <Label htmlFor="private-mode" className="text-zinc-200">
                    Private <span className="text-xs text-zinc-500">(not visible to public)</span>
                    </Label>
                </div>
                </div>
              <Button onClick={handleSubmit} disabled={loading} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md">
                {loading ? 'Loading...' : 'Send'}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Reply Dialog */}
      <div className={`z-20 fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 py-4 transition-all duration-300 ${isReplyDialogOpen ? 'blur-sm brightness-50' : ''}`}>
        <div className="container mx-auto px-4">
          <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-zinc-200 rounded-xl border-zinc-800">
              <DialogHeader>
                <DialogTitle className="text-zinc-200">Reply to Voice</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea
                  placeholder="Type your reply here (max 1000 characters)"
                  value={newReply}
                  onChange={(e) => {
                    setNewReply(e.target.value);
                    setNewReplyCharCount(e.target.value.length);
                  }}
                  className="col-span-3 bg-zinc-800 text-zinc-200 border-zinc-700 rounded-md"
                />
                <p className="text-xs text-zinc-500">{newReplyCharCount}/{MAX_CHAR_LIMIT} characters</p>
              </div>
              <Button onClick={handleReplySubmit} disabled={loading} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md">
                {loading ? 'Loading...' : 'Send Reply'}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
    </>
  );
}