import { z, Schema } from 'zod';

interface ParseResult<T> {                                                                                                              
  data?: T;                                                                                                                             
  error?: z.ZodError<T>;                                                                                                                
}                                                                                                                                           
                                                                                                                                              
export const zodSafeParse = <T>(schema: Schema<T>, inputData: Partial<T>): ParseResult<T> => {                                                                                                                  
  const result: ParseResult<T> = {};                                                                                                        
  const parsedData = schema.safeParse(inputData);                                                                                              
                                                                                                                                                
  if (parsedData.success === false) {                                                                                                          
    result.error = parsedData.error;                                                                                                              
  } else {                                                                                                                                            
    result.data = parsedData.data;                                                                                                                             
  }                                                                                                                                                   
                                                                                                                                                                
  return result;                                                                                                                                   
};


export const zPollTypeSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  options: z.array(z.string()),
  createdAt: z.date().optional(),
  isLive: z.boolean().optional(),
});

export const zPollersSchema = z.object({
  pollId: z.string(),
  IPAdress: z.string(),
  pollOption: z.number(),
});

export const zOptionsCountSchema = z.object({
  pollId: z.string(),
  pollOption: z.string(),
  count: z.number(),
});

