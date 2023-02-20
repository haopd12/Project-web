try:
    import os
    import argparse
    from scrapper.novel_scrapper import NovelScrapper
    from scrapper.config import Config
    import sqlite3
    from Import_to_Db import Insert_Chapter, Insert_Novel, Insert_Novel_Chapter
except Exception as e:
    print("Caught exception while importing: {}".format(e))
    

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description = "")
    parser.add_argument('--dir', help = 'output dir', default='Output', type=str)
    parser.add_argument('--file', help = 'output file', default='crawl_data', type=str)
    parser.add_argument('-st', '--start', help = "the start page for search", default = 1, type = int)
    parser.add_argument('-np', '--number-of-pages', help = 'number of pages for search', default = 5, type = int )
    args = parser.parse_args()
    print("Start crawling...")
    print(args)
    
    current_path = os.getcwd()
    save_dir = current_path + '/' + args.dir
    
    configs = Config(save_dir= save_dir, save_file= args.file, start=args.start, number=args.number_of_pages)
    crawler = NovelScrapper(configs)
    crawler.run()
    
    connection=sqlite3.connect("database/database.db")
    Insert_Novel(novel_info = crawler.novel_info, connection = connection)
    Insert_Chapter(chapter_info = crawler.chapter_info, connection = connection)
    Insert_Novel_Chapter(foreign_base = crawler.foreign_base, connection = connection)
    connection.commit()
    connection.close()