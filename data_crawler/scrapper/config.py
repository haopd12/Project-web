import urllib
class Config:
    SEARCH_URL = 'https://allnovel.net{}?page={}'
    BASE_URL = "https://allnovel.net"
    def __init__(self, save_dir = "", save_file = "", start = 1, number = 5):
        self.save_dir = save_dir
        self.save_file = save_file
        self.start = start
        self.number = number    
    def image_data(self):
        return '{"option":{"save_dir":"' + self.save_dir + '","save_file":"' + self.save_file  + '"}'