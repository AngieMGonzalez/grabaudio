/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import songluetransparent from '../../images/songluetransparent.png';
import { viewSnippetDetails } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleSnippet } from '../../api/snippetData';

export default function ViewSnippet() {
  const [snippetDetails, setSnippetDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;
  const audioRef = useRef(null);

  useEffect(() => {
    viewSnippetDetails(firebaseKey)?.then(setSnippetDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title> View {snippetDetails?.title} </title>
      </Head>
      <br />
      <h1>
        Lil Snippet of Sound: {snippetDetails?.title}
      </h1>
      <h3>A piece of Song: {snippetDetails?.songData?.title}</h3>
      <Card style={{ width: '50rem', margin: '20px' }}>
        <Image variant="top" src={songluetransparent} alt={snippetDetails?.title} />
        <Card.Body>
          <Card.Title>{snippetDetails?.title}</Card.Title>

          <audio controls ref={audioRef} src={snippetDetails.audio_url}>
            <track kind="captions" />
          </audio>

          <h6>Description:</h6> <p>{snippetDetails?.description}</p>
          <h6>Key:</h6> <p>{snippetDetails?.keyOf}</p>
          <h6>BPM:</h6> <p>{snippetDetails?.bpm}</p>
          <p>
            {snippetDetails.isPublic ? 'Shared Sound 👥' : 'Private 🔒'}
          </p>
          <p>
            {snippetDetails.favorite ? 'Favorite ⭐️⭐️⭐️⭐️' : 'Favorite? Nah'}
          </p>

          <Link href={`/snippet/edit/${snippetDetails.firebaseKey}`} passHref>
            {snippetDetails.uid === user.uid ? (<Button variant="outline-dark" className="m-2">edit</Button>) : '' }
          </Link>

          {snippetDetails.uid === user.uid ? (<Button variant="outline-dark" className="m-2" onClick={deleteSingleSnippet}>delete</Button>) : ''}
        </Card.Body>
      </Card>
    </>
  );
}
