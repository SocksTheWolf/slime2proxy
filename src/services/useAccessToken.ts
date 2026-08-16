import { useClient } from '@/contexts/client/useClient'
import { getANewTokenLink, infiniteCache } from '@/services/helpers'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

const slime2Api = axios.create({
  baseURL: 'https://make.twitchauth.work',
})

export default function useAccessToken(provider: Slime2.Auth.Provider) {
  const { keys, platforms } = useClient()
  const key = keys[provider]
  const [ready, setReady] = useState(false)
  const platform: Slime2.Platform = provider === 'google' ? 'youtube' : provider
  const platformSet = platforms.includes(platform)

  useEffect(() => {
    function onReady() {
      setReady(true)
    }

    addEventListener('slime2:ready', onReady)

    return () => {
      removeEventListener('slime2:ready', onReady)
    }
  }, [])

  return useQuery({
    enabled: ready,
    queryKey: [provider, platformSet, 'accessToken', key || null],
    queryFn: async () => {
      // throw error just to prevent fetching the access token
      if (!platformSet) throw Error('Not an actual error')
      return getAccessToken(provider, key)
    },
    ...infiniteCache,
  })
}

export async function getAccessToken(
  provider: Slime2.Auth.Provider,
  key?: string,
): Promise<string> {
  if (!key) throw new KeyNotFoundError(`Key not found for platform ${provider}`)
  if (provider !== "twitch") throw new KeyNotFoundError(`${provider} not supported`)

  return slime2Api
    .post<Slime2.Api.MTAWTokenResponse>(`/get`, key, {
      headers: {
        /*Authorization: `Bearer ${key}`*/
        "Content-Type": "text/plain"
      },
    })
    .then(response => response.data.access_token)
    .catch(error => {
      const errorMessage = `Invalid key for platform ${provider}, download a new one from ${getANewTokenLink}`
      console.error(errorMessage, error)

      throw new KeyInvalidError(
        `Invalid key for platform ${provider}, download a new one from ${getANewTokenLink}`,
        { cause: error },
      )
    })
}

export class KeyNotFoundError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'KeyNotFoundError'
  }
}

export class KeyInvalidError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'KeyInvalidError'
  }
}
