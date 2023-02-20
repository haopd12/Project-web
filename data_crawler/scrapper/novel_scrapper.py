try:
    from bs4 import BeautifulSoup
    import requests
    import bs4
    import os
    import json
    import traceback
except Exception as e:
    print('Caught exception while importing: {}'.format(e))
    
    
def make_dir(output_path):
    if not os.path.exists(output_path):
        os.makedirs(output_path)
      
        
def write_json(filename, data):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def read_json(filename):    
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
            return data
    except Exception as e:
        print('Error loading {}'.format(filename), e)
        traceback.print_exc()
        return []


def request_url(url):
    session = requests.Session()
    header = {"User-Agent": 
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 \
                (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
            "Accept": "novel_name/html,application/xhtml+xml,application/xml;\
                q=0.9,image/webp,image/apng,*/*;q=0.8"}
    response = session.get(url, headers=header)
    soup = BeautifulSoup(response.text, "html.parser")
    return soup


class NovelScrapper:
    
    
    novel_info = []  #this array stores links(NID), themes of all novel
    chapter_info = []  #this array stores links(CID), contents, pages of all chapter
    foreign_base = []  #this array stores foreign key NID and CID
    
    # type: this is constructor
    def __init__(self, config):
        self.config = config
    
    # type: get theme of novels from base url
    @property
    def base_extract(self):
        url = self.config.BASE_URL
        soup = request_url(url)
        list_theme = []
        box_right = soup.select('div.box-right')
        tag_a = box_right[0].select('a')
        for ele in tag_a:
            try:   
                list_theme.append(ele['href'])
            except Exception as e:
                print("Error: ", e)
                traceback.print_exc()
        return list_theme
    
    # type: get novel link from each theme
    def get_novel(self, theme = "/romance.html", start = 1):
        url=self.config.SEARCH_URL
        soup = request_url(url.format(theme, start))
        list_novel = soup.select("div.list-novel")
        novel_tag = list_novel[0].select("div")
        i = 0  
        list_link = []
        list_poster = []
        for tag in novel_tag:
            i += 1
            tag_a = tag.select('a')
            if len(tag_a) > 0 and i % 2 == 0:    
                novel_link = tag_a[0]['href'] 
                list_link.append(self.config.BASE_URL + novel_link)
                novel_poster = tag_a[0].select("img")[0]['src']
                list_poster.append(self.config.BASE_URL + novel_poster)
        index = 0
        for link in list_link:
            ele_data = {
                "NID": link,
                "Poster": list_poster[index],
                "Theme": theme.replace('/', '').replace('.html', ''),
            }
            index += 1
            self.novel_info.append(ele_data)
        return list_link
    
    # type: crawl chapter content and save in output dir
    def chapter_extract(self, url = 'https://allnovel.net/always-and-forever-lara-jean-to-all-the-boys-i-ve-loved-before-3.html'):
        chapter_url = url.replace(".html", "") + "/page-{}.html"
        chapter_dir = url.replace("https://allnovel.net/", "").replace(".html", "")
        current_path = os.getcwd() 
        save_dir = os.path.join(current_path + '/novel_content' , chapter_dir)
        make_dir(save_dir)
        for i in range (1,6):
            soup = request_url(chapter_url.format(i))
            content = soup.select("div.des_novel")[0]
            content = content.getText()
            filename = "page{}.txt".format(i)
            with open(os.path.join(save_dir, filename), "w", encoding="utf-8") as f:
                f.write(content)
            ele_chapter = {
                "CID": chapter_url.format(i),
                "Content": os.path.join(save_dir, filename),
                "Page": i
            }
            self.chapter_info.append(ele_chapter)
            
            foreign_ele = {
                "NID": url,
                "CID": chapter_url.format(i)
            }
            self.foreign_base.append(foreign_ele)
            
    # type: extract all chapter content            
    def run(self):
        list_theme = self.base_extract
        # for theme in list_theme:
        #     for i in range(1,2):
        #         list_link = self.get_novel(theme = theme, start = i)
        #         for link in list_link:
        #             self.chapter_extract(link)
        for i in range(1,2):
            list_link = self.get_novel(theme = list_theme[6], start = i)
            for link in list_link:
                self.chapter_extract(link)