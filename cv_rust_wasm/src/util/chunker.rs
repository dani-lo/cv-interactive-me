use crate::models::StaticAsset;

pub fn chunker <T>(items: Vec<T>, chunk_size: usize) -> Vec<Vec<T>> where T: Clone + std::fmt::Debug  {

    let steps_raw : f32 = items.len() as f32 / chunk_size as f32;
    let steps =  steps_raw.ceil() as usize;

    let mut chunks: Vec<Vec<T>> = Vec::new();
    let mut index = 0;

    while index < steps {
        let start = index * chunk_size;
        let end = if (start + chunk_size) < items.len() { start + chunk_size } else { items.len() - 1 };

        let mut chunk;

        if end > start { 
            chunk = Vec::from(&items[start..end]); 
        } else {
            chunk = Vec::new();
            let items_c = items.clone();
            let it = &items_c[items.len() - 1];

            chunk.push(it.clone());
        }

        chunks.push(Vec::from(chunk));

        index = index + 1
    }
    
    return chunks
}

pub fn page_from_chunk <T>(items: Vec<T>, job_id: &usize, page_size: usize) -> usize where T : StaticAsset + Clone + std::fmt::Debug {

    let mut page = 0;
    let chunks = chunker(items.clone(), page_size);

    while page < chunks.len() {
        let chunks_c = chunker(items.clone(), 4);
        let c = &chunks_c[page];
        
        let option_index_element = c
            .iter()
            .position(|x| x.get_uid() == *job_id);

        if option_index_element.is_some() {
            return page;
        }

        page = page + 1;
    }

    page
}