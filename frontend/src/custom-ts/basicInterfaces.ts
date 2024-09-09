// post type interface
export interface Post {
  title: string
  text: string
  id: number
}

//not necessary since requests types can be given directly from axios lib

// type HeadersInit = Headers | string[][] | Record<string, string>

// export interface Config {
//   url: string
//   method: 'POST' | 'GET' | 'PUT' | 'DELETE'
//   headers?: HeadersInit
//   data?: string
// }

export interface BlogData {
  user_name: string
  content: string
  title: string
}
