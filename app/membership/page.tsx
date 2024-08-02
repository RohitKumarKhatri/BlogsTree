import ImageSlider from '@/components/Image';
import ImageCarousel from '@/components/ImageCarousel';
import Button from '@/components/navbar/Button';
import React from 'react';
import { FaCheck } from 'react-icons/fa';

const MembershipPage: React.FC = () => {
  return (
    <div className="min-h-screen p-6 ">
      <p className="text-5xl mb-12 text-center">Join BlogsTree Membership</p>

      <section className="mb-16">
        <div className="flex flex-col md:flex-row justify-center items-stretch space-y-8 md:space-y-0 md:space-x-8">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow-lg flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-semibold mb-4">
                Member of BlogsTree
              </h2>
              <p className="text-xl mb-4">$5/month or $60/year</p>
              <ul className="list-disc list-inside space-y-2 mb-8">
                {[
                  'Read member-only stories',
                  'Support writers you read most',
                  'Earn money for your writing',
                  'Listen to audio narrations',
                  'Read offline with the BlogsTree app',
                  'Access our Mastodon community',
                  'Connect your custom domain',
                  'Create your own publications',
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="m-4">
              <Button href="/signup">Become a member</Button>
            </div>
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow-lg flex-1 flex flex-col justify-between from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <div>
              <h2 className="text-3xl font-semibold mb-4">
                Premium Member of BlogsTree
              </h2>
              <p className="text-xl mb-4">$15/month or $150/year</p>
              <ul className="list-disc list-inside space-y-2 mb-8">
                {[
                  'All BlogsTree member benefits',
                  'Give 4x more to the writers you read',
                  'Share member-only stories with anyone and drive more earnings for writers',
                  'Customize app icon',
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="m-4">
              <Button href="/signup">Become a Premium Member</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16 text-center">
        <p className="text-2xl font-semibold mb-4">
          Support Meaningful Stories
        </p>

        <p className="text-lg mb-8">
          Become a member to read without limits or ads, support talented
          writers, and join a vibrant community that values quality
          storytelling.
        </p>
        <ImageCarousel />
      </section>

      <section className="mb-16">
        <div className="flex flex-col md:flex-row justify-center items-stretch space-y-8 md:space-y-0 md:space-x-8">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow-lg flex-1">
            <h2 className="text-3xl font-medium mb-4">Why Membership?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Support a mission that matters</li>
              <li>Unlock every story</li>
              <li>Enhance your reading experience</li>
              <li>Elevate your writing</li>
              <li>Support writers</li>
            </ul>
          </div>
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow-lg flex-1">
            <h2 className="text-3xl font-medium mb-4">
              What Members Are Saying
            </h2>
            <div className="mb-4">
              <p className="font-semibold">Cassie Kozyrkov</p>
              <p>
                Social media often promotes low-quality content. That's not the
                case with BlogsTree. As a reader and writer, I value the quality
                here.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chief Decision Scientist at Google and BlogsTree member
              </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Enrique Dans</p>
              <p>
                BlogsTree is a game-changer for me. The value it provides far
                exceeds the subscription cost.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Professor of Innovation at IE Business School and BlogsTree
                member
              </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Wenqi Glantz</p>
              <p>
                BlogsTree membership offers a wealth of high-quality tech
                articles. It's one of the best investments I've made for my
                career.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Software Architect at ArisGlobal and BlogsTree member
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembershipPage;
