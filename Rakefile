ssh_user    = "ubuntu@dynamicbodypilates.com"
remote_root = "/srv/static/dynamicbodypilates.com"
ssh_key     = "/home/travis/.ec2/gsg-keypair.pem"

desc "Runs preview"
task :preview => "images:copy" do
  puts "** starting preview server **"
  system "staticmatic preview ."
end

desc "Build the site"
task :build => ["styles:clear", "javascripts:generate", "images:copy"] do
  puts "** building site **"
  system "staticmatic build ."
end

desc "Clear and generate new styles, build, and deploy"
task :deploy do
  puts "** deploying site **"
  system("rsync -avz --rsh \"ssh -i #{ssh_key}\" --delete site/ #{ssh_user}:#{remote_root}")
end

namespace :images do
  desc "Clear images"
  task :clear do
    puts "** clearing images **"
    system "rm -Rfv site/images/*"
  end

  desc "Copy images from src to site"
  task :copy => :clear do 
    puts "** copying images **"
    system "mkdir -p site/images && cp -r src/images/* site/images/"
  end
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
