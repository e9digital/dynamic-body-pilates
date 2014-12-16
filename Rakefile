ssh_user    = "ubuntu@dynamicbodypilates.com"
remote_root = "/srv/static/dynamicbodypilates.com"
ssh_key     = "/home/travis/.ec2/gsg-keypair.pem"
dropbox_dir = "/home/travis/dropbox/e9/jobs/DynamicBodyPilates/public"

desc "Runs preview"
task :preview do
  puts "** starting preview server **"
  system "staticmatic preview ."
end

desc "Build the site"
task :build => ["styles:clear", "javascripts:generate", "dropbox:sync"] do
  puts "** building site **"
  system "staticmatic build ."
end

desc "Clear and generate new styles, build, and deploy"
task :deploy => :build do
  puts "** deploying site **"
  system("rsync -avz --rsh \"ssh -i #{ssh_key}\" --delete site/ #{ssh_user}:#{remote_root}")
end

namespace :dropbox do
  desc "Sync images from dropbox to src"
  task :images do
    if !dropbox_dir || dropbox_dir.empty?
      puts "** dropbox_dir blank, skipping images sync **"
    else
      puts "** synching images from dropbox **"
      system("rsync -avz --delete #{File.join(dropbox_dir, 'images')} site")
    end
  end

  desc "Sync favicon from dropbox to src"
  task :favicon do
    if !dropbox_dir || dropbox_dir.empty?
      puts "** dropbox_dir blank, skipping favicon sync **"
    else
      puts "** synching favicon from dropbox **"
      system("cp #{File.join(dropbox_dir, 'favicon.ico')} site/")
    end
  end

  desc "Sync required files from dropbox"
  task :sync => [:images, :favicon]
end

namespace :javascripts do
  desc "Clear javascripts"
  task :clear do
    puts "** clearing javascripts **"
    system "rm -Rfv site/javascripts/*"
  end

  desc "Generate javascripts"
  task :generate => :clear do
    puts "** generating javascripts **"
    system "jammit -c config/assets.yml -o site/javascripts -f"
  end
end

namespace :styles do
  desc "Clear styles"
  task :clear do
    puts "** clearing styles **"
    system "rm -Rfv site/stylesheets/*"
  end

  desc "Regenerate styles"
  task :generate => :clear do
    puts "** generating styles **" 
    system "compass compile -c config/compass.rb"
  end
end
